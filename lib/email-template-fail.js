export const getFailEmailTemplate = (nume, titluPachet, idPachet, token) => {
    return `
     <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; background:#ffffff; border-radius:24px; padding:12px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0">

        <tr>
          <td align="center" style="padding-bottom:32px;">
            <h1 style="margin:0px; font-size:24px; color:rgba(255, 255, 255, 1);">
              Nu lăsa o eroare să îți oprească progresul!
            </h1>
          </td>
        </tr>

<tr>
  <td style="padding-bottom:24px; font-family: Arial, sans-serif; font-size:16px; line-height:1.6; color:#333333;">
    Salut, <strong>${nume}</strong>!<br><br>

    Am observat că ai încercat să achiziționezi pachetul <strong>${titluPachet}</strong>, însă plata nu s-a finalizat.<br><br>

    Nu îți face griji, se mai întâmplă! Poate a fost o eroare de rețea, un card expirat sau pur și simplu ai greșit codul CVV (eu mereu îl uit pe al meu 😅).<br><br>

    Dacă îți dorești în continuare să faci acea schimbare, am păstrat totul pregătit pentru tine. Apasă butonul de mai jos pentru a finaliza plata și pentru a începe transformarea cât mai curând!
  </td>
</tr>


        <tr>
          <td align="center" style="padding-bottom:8px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
              <tr>
                <td align="center" style="background-color: rgb(0, 157, 255); border-radius:8px;">
                  <a  href="https://www.statemihai.ro/checkout/${idPachet}?tokenclient=${token}"
                     target="_blank"
                     style="display:block; width:100%; padding:12px 0; font-size:20px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:8px;">
                    Reîncearcă Plata
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>


<tr>
  <td align="center" style="font-size:14px; color:#777; line-height:1.6;">

    <hr style="border:0; border-top:1px solid #ddd; width:90%; margin:20px auto;" />

    <div style="max-width:520px; margin:auto; text-align:center;">

      Tranzacțiile pe acest site sunt securizate prin <strong>Stripe</strong>, procesator certificat PCI-DSS. Datele cardului tău nu sunt stocate pe serverele noastre.

      <br><br>

      <strong>Date vânzător:</strong><br>
      S.C. NEW SPORT GENERATION S.R.L<br>
      CUI: 36650195<br>
      Adresă: București<br>
      Email contact:
      <a href="mailto:contact@statemihai.ro" style="color:#555; text-decoration:none;">
        contact@statemihai.ro
      </a>

      <br><br>

      <strong>Dreptul de retragere:</strong><br>
      Poți solicita anularea comenzii în termen de 14 zile, dacă serviciul nu a fost început
      sau programarea nu a fost efectuată.

      <br><br>

      <strong>Protecția datelor (GDPR):</strong><br>
      Datele tale sunt prelucrate doar pentru finalizarea comenzii și comunicarea legată
      de serviciile achiziționate. Poți cere oricând modificarea sau ștergerea lor
      la adresa de contact.

      <br><br>

      <strong>Linkuri utile:</strong><br>
      <a href="https://www.statemihai.ro/politica-de-confidentialitate"
         style="color:rgb(0,157,255); text-decoration:none;">
        Politica de Confidențialitate
      </a><br>
      <a href="https://www.statemihai.ro/termeni-si-conditii"
         style="color:rgb(0,157,255); text-decoration:none;">
        Termeni și condiții
      </a><br>
      <a href="https://www.statemihai.ro/politica-retur"
         style="color:rgb(0,157,255); text-decoration:none;">
        Politica de Retur
      </a>

      <br><br>

      Dacă nu ai efectuat această comandă, te rugăm să ne contactezi imediat.

    </div>

  </td>
</tr>


      </table>
    </td>
  </tr>
</table>`
}