import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { PrivateThemeToggle } from "@/components/admin/private/private-theme-toggle";

interface LoginPageProps {
  searchParams?: Promise<{
    error?: string;
    next?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Login - Bruno Gusmao",
  description: "Acesso administrativo interno ao painel privado.",
};

function getErrorMessage(error?: string): string | null {
  switch (error) {
    case "missing_credentials":
      return "Preencha usuario e senha.";
    case "invalid_credentials":
      return "Credenciais invalidas.";
    case "auth_not_configured":
      return "Configure ADMIN_USERNAME, ADMIN_PASSWORD e JWT_SECRET antes de usar o login.";
    default:
      return null;
  }
}

function getSafeNextPath(candidate?: string): string {
  if (!candidate || !candidate.startsWith("/") || candidate.startsWith("//")) {
    return "/dashboard";
  }

  return candidate;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params?.error);
  const next = getSafeNextPath(params?.next);

  return (
    <main className="terminal-login-page">
      <div className="terminal-login-grid" aria-hidden="true" />

      <section className="terminal-login-stage">
        <header className="terminal-login-header">
          <PrivateThemeToggle />
        </header>

        <section
          className="terminal-login-card flex flex-col"
          aria-labelledby="terminal-login-title"
        >
          <h1 id="terminal-login-title" className="terminal-login-title">
            Secure admin access
          </h1>

          {errorMessage ? (
            <p className="terminal-login-alert" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <form
            id="login-form"
            action="/api/auth/login"
            method="post"
            className="terminal-login-form"
          >
            <input type="hidden" name="next" value={next} />

            <label className="terminal-login-field" htmlFor="login-username">
              <span
                className="terminal-login-icon terminal-login-icon--user"
                aria-hidden="true"
              />
              <input
                id="login-username"
                type="text"
                name="username"
                autoComplete="username"
                className="terminal-login-input"
                placeholder="login"
                required
              />
            </label>

            <label className="terminal-login-field" htmlFor="login-password">
              <span
                className="terminal-login-icon terminal-login-icon--lock"
                aria-hidden="true"
              />
              <input
                id="login-password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="terminal-login-input"
                placeholder="password"
                required
              />
              <span className="terminal-login-spinner" aria-hidden="true" />
            </label>

            <label className="terminal-login-remember" htmlFor="login-remember">
              <input
                id="login-remember"
                type="checkbox"
                className="terminal-login-remember-input"
              />
              <span className="terminal-login-remember-label">
                Lembrar login
              </span>
            </label>

            <div className="terminal-login-actions">
              <button type="submit" className="terminal-login-submit">
                Entrar
              </button>

              <Link href="/" className="terminal-login-return-link">
                Voltar ao site
              </Link>
            </div>
          </form>
        </section>
      </section>

      <Script id="login-remember-script" strategy="afterInteractive">
        {`(() => {
	const storageKey = "brunogusmao.admin.login.username";
	const form = document.getElementById("login-form");
	const usernameInput = document.getElementById("login-username");
	const rememberInput = document.getElementById("login-remember");

	if (!(form instanceof HTMLFormElement)) return;
	if (!(usernameInput instanceof HTMLInputElement)) return;
	if (!(rememberInput instanceof HTMLInputElement)) return;

	const clearStoredLogin = () => {
		try {
			window.localStorage.removeItem(storageKey);
		} catch {}
	};

	const syncRememberedLogin = () => {
		if (!rememberInput.checked) {
			clearStoredLogin();
			return;
		}

		const normalizedLogin = usernameInput.value.trim();
		if (!normalizedLogin) {
			clearStoredLogin();
			return;
		}

		try {
			window.localStorage.setItem(storageKey, normalizedLogin);
		} catch {}
	};

	try {
		const storedLogin = window.localStorage.getItem(storageKey);
		if (storedLogin) {
			usernameInput.value = storedLogin;
			rememberInput.checked = true;
		}
	} catch {}

	rememberInput.addEventListener("change", syncRememberedLogin);
	usernameInput.addEventListener("input", syncRememberedLogin);
	form.addEventListener("submit", syncRememberedLogin);
})();`}
      </Script>
    </main>
  );
}
