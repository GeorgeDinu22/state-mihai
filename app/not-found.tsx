import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000000",
      paddingLeft: "24px",
      paddingRight: "24px",
      fontFamily: "sans-serif"
    }}>
      <div style={{ maxWidth: "36rem", textAlign: "center" }}>

        <h1 style={{
          marginTop: "1rem",
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#ffffff",
          lineHeight: "1.2",
          marginBottom: "1.5rem"
        }}>
          Cred că te-ai rătăcit!
        </h1>

        <p style={{
          marginTop: "1.5rem",
          fontSize: "1.125rem",
          color: "#a0a0a0",
          lineHeight: "1.6"
        }}>
          Orice transformare începe de undeva.
          <br />
          Hai să te întoarcem pe drumul corect.
        </p>

        <div style={{
          marginTop: "2.5rem",
          display: "flex",
          justifyContent: "center"
        }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              backgroundColor: "#009dff",
              padding: "12px 24px",
              color: "#ffffff",
              fontWeight: "650",
              fontSize:"20px",
              textDecoration: "none"
            }}
          >
            Înapoi acasă
          </Link>
        </div>
      </div>
    </div>
  );
}