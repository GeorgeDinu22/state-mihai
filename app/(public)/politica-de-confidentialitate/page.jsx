import Footer from "@/localComponents/Footer";
import "../styles/index.css";

export const metadata = {
  title: "Politica de confidențialitate (GDPR) | Mihai State",
  description:
    "Politica de confidențialitate privind prelucrarea datelor cu caracter personal pentru servicii de coaching fitness online.",
};

export default function PoliticaDeConfidentialitate() {
  return (
    <>
    <main className="legalPage">
      <h1>Politica de confidențialitate (GDPR)</h1>
      <p>Ultima actualizare: 19.01.2026</p>

      <section>
        <h2>1. Cine suntem</h2>
        <p>
          Operator de date: <strong>S.C. NEW SPORT GENERATION S.R.L</strong>
          <br />
          CUI/CIF: <strong>36650195</strong>
          <br />
          Sediu: <strong>București</strong>
          <br />
          E-mail:{" "}
          <a href="mailto:contact@statemihai.ro">
            contact@statemihai.ro
          </a>
          <br />
          Telefon: <strong> +40 746 113 737</strong>
        </p>
      </section>

      <section>
        <h2>2. Ce date colectăm</h2>
        <ul>
          <li>Date de identificare: nume.</li>
          <li>Date de contact: adresă de e-mail, număr de telefon.</li>
          <li>
            Date necesare plății: procesate în siguranță de Stripe (nu stocăm date
            de card).
          </li>
          <li>
            Date tehnice minime necesare funcționării site-ului (ex. loguri de
            server, adrese IP anonimizate).
          </li>
        </ul>
        <p>
          Nu colectăm date medicale, date privind sănătatea și nu solicităm poze
          de tip „before/after”.
        </p>
      </section>

      <section>
        <h2>3. Scopul și temeiul legal al prelucrării</h2>
        <ul>
          <li>
            Executarea contractului (art. 6 alin. (1) lit. b GDPR) – pentru
            furnizarea serviciilor de coaching fitness online.
          </li>
          <li>
            Consimțământul (art. 6 alin. (1) lit. a GDPR) – pentru transmiterea de
            oferte promoționale și comunicări comerciale.
          </li>
          <li>
            Obligații legale (art. 6 alin. (1) lit. c GDPR) – facturare și evidențe
            contabile.
          </li>
          <li>
            Interes legitim (art. 6 alin. (1) lit. f GDPR) – pentru securitatea
            site-ului și prevenirea fraudelor, fără a afecta drepturile
            utilizatorilor.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Cui transmitem datele</h2>
        <ul>
          <li>
            <strong>Stripe Payments Europe</strong> – procesator de plăți, conform
            standardelor PCI-DSS.
          </li>
          <li>
            Furnizori IT și de hosting (ex. Vercel), strict în scopuri tehnice și
            de securitate.
          </li>
          <li>
            Autorități publice, doar în cazurile prevăzute de lege.
          </li>
        </ul>
        <p>
          Anumiți furnizori pot transfera date în afara Spațiului Economic
          European, folosind mecanisme legale de protecție (clauze contractuale
          standard).
        </p>
      </section>

      <section>
        <h2>5. Durata stocării datelor</h2>
        <ul>
          <li>
            Datele contractuale: pe durata colaborării și până la 3 ani după
            încetare.
          </li>
          <li>
            Datele de facturare: conform legislației fiscale aplicabile.
          </li>
          <li>
            Datele utilizate în scop de marketing: până la retragerea
            consimțământului.
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Drepturile tale</h2>
        <ul>
          <li>Dreptul de acces la date.</li>
          <li>Dreptul la rectificare sau ștergere.</li>
          <li>Dreptul la restricționarea prelucrării.</li>
          <li>Dreptul la portabilitatea datelor.</li>
          <li>Dreptul de opoziție.</li>
          <li>Dreptul de a retrage consimțământul în orice moment.</li>
          <li>
            Dreptul de a depune plângere la ANSPDCP (
            <a
              href="https://www.dataprotection.ro"
              target="_blank"
              rel="noreferrer"
            >
              dataprotection.ro
            </a>
            ).
          </li>
        </ul>
        <p>
          Pentru exercitarea drepturilor, ne poți contacta la{" "}
          <a href="mailto:contact@statemihai.ro">
            contact@statemihai.ro
          </a>
          .
        </p>
      </section>

      <section>
        <h2>7. Securitatea datelor</h2>
        <p>
          Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea
          datelor cu caracter personal, inclusiv acces limitat, criptare a
          comunicațiilor și monitorizarea infrastructurii.
        </p>
      </section>

      <section>
        <h2>8. Minori</h2>
        <p>
          Serviciile noastre nu se adresează persoanelor sub 16 ani. Nu colectăm
          cu bună știință date ale minorilor.
        </p>
      </section>

      <section>
        <h2>9. Cookies</h2>
        <p>
          Site-ul nu utilizează cookies de marketing sau de urmărire. Pot fi
          utilizate doar cookies strict necesare funcționării tehnice a
          site-ului, care nu necesită consimțământ.
        </p>
      </section>

      <section>
        <h2>10. Modificări ale politicii</h2>
        <p>
          Ne rezervăm dreptul de a actualiza periodic această politică. Versiunea
          actualizată va fi publicată pe această pagină.
        </p>
      </section>
    </main>
    <Footer/>
    </>
  );
}
