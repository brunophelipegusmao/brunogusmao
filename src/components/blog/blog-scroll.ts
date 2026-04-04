const blogEntriesTargetSelector = "#blog-recent";

export function scrollBlogEntriesIntoView() {
  document.querySelector<HTMLElement>(blogEntriesTargetSelector)?.scrollIntoView({
    block: "start",
  });
}
