import { useState, useEffect } from "react";

const ACCENT = "#7C3AED";
const ACCENT_HOVER = "#6D28D9";
const ACCENT_LIGHT = "#EDE9FE";

function useColorScheme() {
  const [dark, setDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return dark;
}

const themes = {
  light: {
    bg: "#F2F2F7",
    cardBg: "rgba(255,255,255,0.85)",
    cardBorder: "rgba(0,0,0,0.08)",
    labelPrimary: "#1C1C1E",
    labelSecondary: "#6E6E73",
    separator: "rgba(60,60,67,0.13)",
    inputText: "#1C1C1E",
    inputPlaceholder: "#C7C7CC",
    shadow: "0 8px 32px rgba(0,0,0,0.10)",
    logoShadow: "0 4px 20px rgba(124,58,237,0.25)",
  },
  dark: {
    bg: "#1C1C1E",
    cardBg: "rgba(44,44,46,0.90)",
    cardBorder: "rgba(255,255,255,0.08)",
    labelPrimary: "#FFFFFF",
    labelSecondary: "#EBEBF5CC",
    separator: "rgba(84,84,88,0.65)",
    inputText: "#FFFFFF",
    inputPlaceholder: "#636366",
    shadow: "0 8px 32px rgba(0,0,0,0.45)",
    logoShadow: "0 4px 20px rgba(124,58,237,0.40)",
  },
};

export default function App() {
  const isDark = useColorScheme();
  const t = isDark ? themes.dark : themes.light;

  const [screen, setScreen] = useState("login"); // "login" | "magic" | "register" | "dashboard"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [magicEmail, setMagicEmail] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const isLoginReady = email.trim().length > 0 && password.length >= 6;
  const isMagicReady = magicEmail.includes("@");
  const isRegReady =
    regName.trim().length > 0 &&
    regEmail.includes("@") &&
    regPassword.length >= 6;

  function handleLogin(e) {
    e.preventDefault();
    if (!isLoginReady) return;
    setLoading(true);
    setError("");
    // TODO: Conectar con API de autenticación real (POST /api/auth/login)
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@digitalpurple.com" && password === "demo123") {
        setScreen("dashboard");
      } else {
        setError("Correo o contraseña incorrectos. Prueba demo@digitalpurple.com / demo123");
      }
    }, 1200);
  }

  function handleMagicLink(e) {
    e.preventDefault();
    if (!isMagicReady) return;
    setLoading(true);
    setError("");
    // TODO: Implementar envío de magic link (POST /api/auth/magic-link)
    setTimeout(() => {
      setLoading(false);
      setMagicSent(true);
    }, 1000);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!isRegReady) return;
    setLoading(true);
    setError("");
    // TODO: Conectar con API de registro (POST /api/auth/register)
    setTimeout(() => {
      setLoading(false);
      setScreen("dashboard");
    }, 1200);
  }

  const styles = {
    root: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 20px",
      paddingTop: "env(safe-area-inset-top, 20px)",
      background: t.bg,
      transition: "background 0.3s ease",
      fontFamily:
        "-apple-system, 'SF Pro Display', 'Inter Tight', system-ui, sans-serif",
    },
    container: {
      width: "100%",
      maxWidth: 390,
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    },
    header: {
      textAlign: "center",
      marginBottom: 32,
    },
    logo: {
      display: "block",
      margin: "0 auto 20px",
      width: 72,
      height: 72,
      borderRadius: 16,
      background: `linear-gradient(135deg, ${ACCENT} 0%, #A855F7 100%)`,
      boxShadow: t.logoShadow,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      fontSize: 32,
      fontWeight: 800,
      color: "#fff",
      letterSpacing: -1,
      userSelect: "none",
    },
    h1: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: 0.36,
      color: t.labelPrimary,
      lineHeight: "34px",
      marginBottom: 6,
      margin: "0 0 6px 0",
      transition: "color 0.3s",
    },
    subtitle: {
      fontSize: 17,
      color: t.labelSecondary,
      letterSpacing: -0.43,
      margin: 0,
      transition: "color 0.3s",
    },
    card: {
      marginBottom: 16,
      overflow: "hidden",
      borderRadius: 16,
      background: t.cardBg,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: `1px solid ${t.cardBorder}`,
      boxShadow: t.shadow,
      transition: "background 0.3s, box-shadow 0.3s",
    },
    fieldWrap: (last) => ({
      padding: "0 16px",
      borderBottom: last ? "none" : `0.5px solid ${t.separator}`,
      transition: "background 0.2s",
    }),
    label: {
      display: "block",
      fontSize: 13,
      color: t.labelSecondary,
      letterSpacing: -0.08,
      paddingTop: 11,
      paddingBottom: 2,
      transition: "color 0.2s",
    },
    input: (focused) => ({
      width: "100%",
      height: "auto",
      paddingLeft: 0,
      paddingBottom: 11,
      paddingTop: 2,
      paddingRight: 0,
      border: "none",
      outline: "none",
      borderRadius: 0,
      background: "transparent",
      fontSize: 17,
      color: t.inputText,
      caretColor: ACCENT,
      transition: "color 0.2s",
      boxSizing: "border-box",
    }),
    btnPrimary: (disabled) => ({
      width: "100%",
      height: 50,
      borderRadius: 14,
      background: disabled
        ? isDark
          ? "rgba(124,58,237,0.35)"
          : "rgba(124,58,237,0.25)"
        : `linear-gradient(135deg, ${ACCENT} 0%, #A855F7 100%)`,
      border: "none",
      color: disabled ? (isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.5)") : "#fff",
      fontSize: 17,
      fontWeight: 600,
      letterSpacing: -0.2,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s ease",
      boxShadow: disabled ? "none" : "0 4px 16px rgba(124,58,237,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    }),
    btnGhost: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 15,
      color: ACCENT,
      fontWeight: 600,
      padding: "4px 8px",
      borderRadius: 8,
      transition: "opacity 0.2s",
    },
    errorBox: {
      background: isDark ? "rgba(255,59,48,0.15)" : "#FFF1F0",
      border: `1px solid ${isDark ? "rgba(255,59,48,0.3)" : "#FFCCC7"}`,
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 12,
      fontSize: 13,
      color: isDark ? "#FF6B6B" : "#CF1322",
      letterSpacing: -0.1,
    },
    link: {
      color: ACCENT,
      textDecoration: "none",
      fontWeight: 600,
      cursor: "pointer",
    },
    footer: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 15,
      letterSpacing: -0.23,
      color: t.labelSecondary,
    },
    spinner: {
      width: 20,
      height: 20,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTopColor: "#fff",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    },
    // Dashboard styles
    dashboardWrap: {
      minHeight: "100vh",
      background: t.bg,
      transition: "background 0.3s",
      fontFamily: "-apple-system, 'SF Pro Display', 'Inter Tight', system-ui, sans-serif",
    },
    topbar: {
      position: "sticky",
      top: 0,
      zIndex: 100,
      background: isDark ? "rgba(28,28,30,0.85)" : "rgba(242,242,247,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `0.5px solid ${t.separator}`,
      padding: "0 20px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    topbarLogo: {
      display: "flex",
      alignItems: "center",
      gap: 10,
    },
    topbarLogoIcon: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: `linear-gradient(135deg, ${ACCENT} 0%, #A855F7 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 800,
      color: "#fff",
    },
    topbarName: {
      fontSize: 17,
      fontWeight: 700,
      color: t.labelPrimary,
      letterSpacing: -0.3,
    },
    topbarRight: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    avatarBtn: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${ACCENT} 0%, #A855F7 100%)`,
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 700,
      color: "#fff",
    },
  };

  // ── DASHBOARD ──────────────────────────────────────────────
  if (screen === "dashboard") {
    return <Dashboard t={t} isDark={isDark} styles={styles} onLogout={() => { setScreen("login"); setEmail(""); setPassword(""); }} />;
  }

  // ── MAGIC LINK ─────────────────────────────────────────────
  if (screen === "magic") {
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={{ ...styles.logo, margin: "0 auto 20px" }}>
              <span style={styles.logoText}>DP</span>
            </div>
            <h1 style={styles.h1}>{magicSent ? "¡Código enviado!" : "Código por correo"}</h1>
            <p style={styles.subtitle}>
              {magicSent
                ? `Revisa tu bandeja en ${magicEmail}`
                : "Te enviamos un enlace mágico de acceso"}
            </p>
          </div>

          {!magicSent ? (
            <>
              <div style={styles.card}>
                <form onSubmit={handleMagicLink}>
                  <div style={styles.fieldWrap(true)}>
                    <label style={styles.label}>Correo electrónico</label>
                    <input
                      type="email"
                      style={styles.input(focusedField === "magic-email")}
                      placeholder="correo@ejemplo.com"
                      value={magicEmail}
                      onChange={(e) => setMagicEmail(e.target.value)}
                      onFocus={() => setFocusedField("magic-email")}
                      onBlur={() => setFocusedField(null)}
                      autoComplete="email"
                    />
                  </div>
                </form>
              </div>

              <button
                style={styles.btnPrimary(!isMagicReady || loading)}
                disabled={!isMagicReady || loading}
                onClick={handleMagicLink}
              >
                {loading ? <div style={styles.spinner} /> : "Enviar código →"}
              </button>
            </>
          ) : (
            <div style={{ ...styles.card, padding: "24px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📨</div>
              <p style={{ color: t.labelSecondary, fontSize: 15, margin: 0 }}>
                Si tu cuenta existe, recibirás el enlace en breve.
              </p>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button style={styles.btnGhost} onClick={() => { setScreen("login"); setMagicSent(false); setMagicEmail(""); }}>
              ← Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── REGISTER ───────────────────────────────────────────────
  if (screen === "register") {
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={{ ...styles.logo, margin: "0 auto 20px" }}>
              <span style={styles.logoText}>DP</span>
            </div>
            <h1 style={styles.h1}>Crear cuenta</h1>
            <p style={styles.subtitle}>en Digital Purple</p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <div style={styles.card}>
            <form onSubmit={handleRegister}>
              <div style={styles.fieldWrap(false)}>
                <label style={styles.label}>Nombre completo</label>
                <input
                  type="text"
                  style={styles.input(focusedField === "reg-name")}
                  placeholder="Tu nombre"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  onFocus={() => setFocusedField("reg-name")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="name"
                />
              </div>
              <div style={styles.fieldWrap(false)}>
                <label style={styles.label}>Correo electrónico</label>
                <input
                  type="email"
                  style={styles.input(focusedField === "reg-email")}
                  placeholder="correo@ejemplo.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  onFocus={() => setFocusedField("reg-email")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="email"
                />
              </div>
              <div style={styles.fieldWrap(true)}>
                <label style={styles.label}>Contraseña</label>
                <input
                  type="password"
                  style={styles.input(focusedField === "reg-pass")}
                  placeholder="Mínimo 6 caracteres"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  onFocus={() => setFocusedField("reg-pass")}
                  onBlur={() => setFocusedField(null)}
                  autoComplete="new-password"
                />
              </div>
            </form>
          </div>

          <button
            style={styles.btnPrimary(!isRegReady || loading)}
            disabled={!isRegReady || loading}
            onClick={handleRegister}
          >
            {loading ? <div style={styles.spinner} /> : "Crear cuenta →"}
          </button>

          <p style={styles.footer}>
            ¿Ya tienes cuenta?{" "}
            <span style={styles.link} onClick={() => { setScreen("login"); setError(""); }}>
              Inicia sesión
            </span>
          </p>
        </div>
      </div>
    );
  }

  // ── LOGIN (default) ────────────────────────────────────────
  return (
    <div style={styles.root}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: ${t.inputPlaceholder}; }
        button:active { opacity: 0.85; }
      `}</style>

      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ ...styles.logo, margin: "0 auto 20px" }}>
            <span style={styles.logoText}>DP</span>
          </div>
          <h1 style={styles.h1}>Inicia sesión</h1>
          <p style={styles.subtitle}>en tu cuenta de Digital Purple</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.card}>
          <form onSubmit={handleLogin}>
            <div style={styles.fieldWrap(false)}>
              <label style={styles.label} htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                style={styles.input(focusedField === "email")}
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                autoComplete="email"
                required
              />
            </div>
            <div style={styles.fieldWrap(true)}>
              <label style={styles.label} htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                style={styles.input(focusedField === "password")}
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                autoComplete="current-password"
                required
              />
            </div>
          </form>
        </div>

        <button
          style={styles.btnPrimary(!isLoginReady || loading)}
          disabled={!isLoginReady || loading}
          onClick={handleLogin}
        >
          {loading ? <div style={styles.spinner} /> : "Ingresar →"}
        </button>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button style={styles.btnGhost} onClick={() => { setScreen("magic"); setError(""); }}>
            Usar código por correo
          </button>
        </div>

        <p style={styles.footer}>
          ¿No tienes cuenta?{" "}
          <span style={styles.link} onClick={() => { setScreen("register"); setError(""); }}>
            Regístrate
          </span>
        </p>

        <p style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: t.labelSecondary, opacity: 0.7 }}>
          Demo: demo@digitalpurple.com / demo123
        </p>
      </div>
    </div>
  );
}

// ── DASHBOARD COMPONENT ────────────────────────────────────────────────────────
function Dashboard({ t, isDark, styles, onLogout }) {
  const [activeTab, setActiveTab] = useState("productos");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const products = [
    {
      id: 1,
      name: "Campaña Verano 2025",
      status: "listo",
      assets: 8,
      assetsOk: 8,
      category: "Meta Ads",
      updated: "Hace 2h",
    },
    {
      id: 2,
      name: "Lanzamiento App v2",
      status: "revision",
      assets: 12,
      assetsOk: 9,
      category: "Google Ads",
      updated: "Hace 5h",
    },
    {
      id: 3,
      name: "Email Nurturing Q2",
      status: "pendiente",
      assets: 6,
      assetsOk: 2,
      category: "Email",
      updated: "Ayer",
    },
    {
      id: 4,
      name: "Retargeting RRSS",
      status: "listo",
      assets: 4,
      assetsOk: 4,
      category: "Meta Ads",
      updated: "Hace 1d",
    },
    {
      id: 5,
      name: "Influencer Collab",
      status: "revision",
      assets: 10,
      assetsOk: 6,
      category: "Orgánico",
      updated: "Hace 2d",
    },
  ];

  const stats = [
    { label: "Campañas activas", value: "12", icon: "🚀", color: "#7C3AED" },
    { label: "Activos verificados", value: "94%", icon: "✅", color: "#059669" },
    { label: "Pendientes", value: "3", icon: "⏳", color: "#D97706" },
    { label: "Lanzadas hoy", value: "2", icon: "📡", color: "#2563EB" },
  ];

  const statusConfig = {
    listo: { label: "Listo", bg: isDark ? "rgba(5,150,105,0.2)" : "#D1FAE5", color: isDark ? "#34D399" : "#065F46" },
    revision: { label: "En revisión", bg: isDark ? "rgba(217,119,6,0.2)" : "#FEF3C7", color: isDark ? "#FBBF24" : "#92400E" },
    pendiente: { label: "Pendiente", bg: isDark ? "rgba(239,68,68,0.2)" : "#FEE2E2", color: isDark ? "#F87171" : "#991B1B" },
  };

  const tabs = [
    { id: "productos", label: "Productos", icon: "📦" },
    { id: "activos", label: "Activos", icon: "🗂️" },
    { id: "campanas", label: "Campañas", icon: "📡" },
    { id: "ajustes", label: "Ajustes", icon: "⚙️" },
  ];

  const cardStyle = {
    borderRadius: 16,
    background: t.cardBg,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: `1px solid ${t.cardBorder}`,
    boxShadow: t.shadow,
    overflow: "hidden",
    transition: "background 0.3s",
  };

  return (
    <div style={styles.dashboardWrap}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .dp-product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(124,58,237,0.18) !important;
        }
        .dp-tab:hover { opacity: 0.8; }
        .dp-stat:hover { transform: scale(1.02); }
      `}</style>

      {/* Topbar */}
      <div style={styles.topbar}>
        <div style={styles.topbarLogo}>
          <div style={styles.topbarLogoIcon}>DP</div>
          <span style={styles.topbarName}>Digital Purple</span>
        </div>
        <div style={styles.topbarRight}>
          <button
            style={{
              background: "none",
              border: `1px solid ${t.cardBorder}`,
              borderRadius: 8,
              padding: "4px 10px",
              fontSize: 13,
              color: t.labelSecondary,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onClick={onLogout}
          >
            Salir
          </button>
          <div style={styles.avatarBtn}>U</div>
        </div>
      </div>

      <div style={{ padding: "0 16px 100px", maxWidth: 800, margin: "0 auto" }}>

        {/* Welcome */}
        <div style={{ padding: "20px 0 8px", animation: "fadeUp 0.5s ease" }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: t.labelPrimary, margin: "0 0 4px" }}>
            Panel de lanzamiento 🎯
          </h2>
          <p style={{ fontSize: 15, color: t.labelSecondary, margin: 0 }}>
            Verifica tus activos antes de lanzar campañas.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 10,
            marginBottom: 20,
            animation: "fadeUp 0.55s ease",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="dp-stat"
              style={{
                ...cardStyle,
                padding: "14px 16px",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.3s",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: t.labelSecondary, marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            overflowX: "auto",
            paddingBottom: 2,
            animation: "fadeUp 0.6s ease",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="dp-tab"
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0,
                padding: "8px 14px",
                borderRadius: 20,
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                transition: "all 0.2s",
                background:
                  activeTab === tab.id
                    ? `linear-gradient(135deg, ${ACCENT}, #A855F7)`
                    : t.cardBg,
                color: activeTab === tab.id ? "#fff" : t.labelSecondary,
                boxShadow: activeTab === tab.id ? "0 4px 12px rgba(124,58,237,0.3)" : "none",
                border: activeTab === tab.id ? "none" : `1px solid ${t.cardBorder}`,
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "productos" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: t.labelPrimary, margin: 0 }}>
                Tus productos
              </h3>
              <button
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #A855F7)`,
                  border: "none",
                  borderRadius: 10,
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(124,58,237,0.3)",
                }}
              >
                + Nuevo
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {products.map((p, i) => {
                const sc = statusConfig[p.status];
                const pct = Math.round((p.assetsOk / p.assets) * 100);
                return (
                  <div
                    key={p.id}
                    className="dp-product-card"
                    style={{
                      ...cardStyle,
                      padding: "14px 16px",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s, background 0.3s",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: t.labelPrimary, marginBottom: 2 }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 12, color: t.labelSecondary }}>
                          {p.category} · {p.updated}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: 20,
                          background: sc.bg,
                          color: sc.color,
                          flexShrink: 0,
                        }}
                      >
                        {sc.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          flex: 1,
                          height: 4,
                          borderRadius: 4,
                          background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            borderRadius: 4,
                            background:
                              pct === 100
                                ? "#059669"
                                : pct >= 60
                                ? `linear-gradient(90deg, ${ACCENT}, #A855F7)`
                                : "#D97706",
                            transition: "width 0.8s ease",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: t.labelSecondary, minWidth: 48 }}>
                        {p.assetsOk}/{p.assets} ✓
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "activos" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ ...cardStyle, padding: "20px" }}>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🗂️</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: t.labelPrimary, margin: "0 0 8px" }}>
                  Gestión de activos
                </h3>
                <p style={{ fontSize: 14, color: t.labelSecondary, margin: 0 }}>
                  Sube y verifica imágenes, videos, copys y creatividades antes de lanzar.
                </p>
              </div>
              <AssetList t={t} isDark={isDark} cardStyle={cardStyle} />
            </div>
          </div>
        )}

        {activeTab === "campanas" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ ...cardStyle, padding: "20px" }}>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📡</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: t.labelPrimary, margin: "0 0 8px" }}>
                  Estado de campañas
                </h3>
                <p style={{ fontSize: 14, color: t.labelSecondary, margin: 0 }}>
                  Monitorea el estado de todas tus campañas activas en tiempo real.
                </p>
              </div>
              <CampaignList t={t} isDark={isDark} />
            </div>
          </div>
        )}

        {activeTab === "ajustes" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ ...cardStyle, marginBottom: 12 }}>
              {[
                { label: "Cuenta y perfil", icon: "👤" },
                { label: "Notificaciones", icon: "🔔" },
                { label: "Integraciones", icon: "🔗" },
                { label: "Facturación", icon: "💳" },
                { label: "Seguridad", icon: "🔒" },
              ].map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? `0.5px solid ${t.separator}` : "none",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 15, color: t.labelPrimary, fontWeight: 500 }}>
                      {item.label}
                    </span>
                  </div>
                  <span style={{ color: t.labelSecondary, fontSize: 18 }}>›</span>
                </div>
              ))}
            </div>
            <button
              onClick={onLogout}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 14,
                background: isDark ? "rgba(255,59,48,0.15)" : "#FFF1F0",
                border: `1px solid ${isDark ? "rgba(255,59,48,0.3)" : "#FFCCC7"}`,
                color: isDark ? "#FF6B6B" : "#CF1322",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: isDark ? "rgba(28,28,30,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: `0.5px solid ${t.separator}`,
          display: "flex",
          justifyContent: "space-around",
          padding: "8px 0 env(safe-area-inset-bottom, 8px)",
          zIndex: 100,
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "4px 12px",
              borderRadius: 10,
              transition: "opacity 0.2s",
              opacity: activeTab === tab.id ? 1 : 0.5,
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: activeTab === tab.id ? ACCENT : t.labelSecondary,
              }}
            >
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AssetList({ t, isDark, cardStyle }) {
  const assets = [
    { name: "Banner Principal 1200x628", type: "Imagen", status: "ok", size: "245 KB" },
    { name: "Video Story 9:16", type: "Video", status: "ok", size: "8.2 MB" },
    { name: "Copy principal — headline", type: "Texto", status: "ok", size: "—" },
    { name: "Logo variante blanca", type: "Imagen", status: "pendiente", size: "34 KB" },
    { name: "CTA Button copy", type: "Texto", status: "revision", size: "—" },
  ];

  const statusDot = { ok: "#059669", pendiente: "#D97706", revision: ACCENT };

  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
      {assets.map((a, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderRadius: 12,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: statusDot[a.status],
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.labelPrimary }}>{a.name}</div>
              <div style={{ fontSize: 11, color: t.labelSecondary }}>{a.type} · {a.size}</div>
            </div>
          </div>
          <span style={{ fontSize: 18 }}>›</span>
        </div>
      ))}
    </div>
  );
}

function CampaignList({ t, isDark }) {
  const campaigns = [
    { name: "Meta — Verano 2025", budget: "$2,500", impressions: "124K", status: "activa" },
    { name: "Google Search — Marca", budget: "$1,200", impressions: "89K", status: "activa" },
    { name: "Email Nurturing Q2", budget: "$300", impressions: "12K", status: "pausada" },
  ];

  return (
    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
      {campaigns.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "12px 14px",
            borderRadius: 12,
            background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.labelPrimary }}>{c.name}</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "2px 7px",
                borderRadius: 20,
                background: c.status === "activa"
                  ? isDark ? "rgba(5,150,105,0.2)" : "#D1FAE5"
                  : isDark ? "rgba(107,114,128,0.2)" : "#F3F4F6",
                color: c.status === "activa"
                  ? isDark ? "#34D399" : "#065F46"
                  : isDark ? "#9CA3AF" : "#374151",
              }}
            >
              {c.status === "activa" ? "🟢 Activa" : "⏸ Pausada"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ fontSize: 12, color: t.labelSecondary }}>💰 {c.budget}</span>
            <span style={{ fontSize: 12, color: t.labelSecondary }}>👁 {c.impressions} imp.</span>
          </div>
        </div>
      ))}
    </div>
  );
}