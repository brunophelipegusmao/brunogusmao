export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [{ name: "Design Tokens", href: "/styleguide" }],
  },
  {
    title: "Form Controls",
    items: [
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Checkbox", href: "/styleguide/components/checkbox" },
      { name: "Radio", href: "/styleguide/components/radio" },
      { name: "Switch / Toggle", href: "/styleguide/components/switch" },
      { name: "Select / Dropdown", href: "/styleguide/components/select" },
    ],
  },
  {
    title: "Display",
    items: [
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Separator", href: "/styleguide/components/separator" },
      { name: "Skeleton / Loader", href: "/styleguide/components/skeleton" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { name: "Pagination", href: "/styleguide/components/pagination" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "Dialog / Pop-Up", href: "/styleguide/components/dialog" },
      { name: "Context Menu", href: "/styleguide/components/context-menu" },
      { name: "Progress Bar", href: "/styleguide/components/progress" },
    ],
  },
];
