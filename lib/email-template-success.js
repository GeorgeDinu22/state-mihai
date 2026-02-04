export const getConfirmationEmailHtml = ({
  metadata,
  data,
  idComanda,
  pi,
  oraPlatii,
  includeList,
  clientInfo
}) => {
  return `
            <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, Helvetica, sans-serif; background:#ffffff; border-radius:24px; padding:12px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0">

        <tr>
          <td align="center" style="padding-bottom:24px;">
            <h1 style="margin:0; font-size:26px; color:rgb(0,157,255);">
              Confirmare comandă
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:24px; font-size:17px; line-height:1.6; color:#333;">
            Salut, <strong>${clientInfo.numeComplet}</strong><br><br>
            Comanda ta a fost procesată cu succes!<br>
            ID comandă: <strong>${idComanda}</strong>
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:24px;">
            <h2 style="font-size:21px; color:rgb(0,157,255); margin:0 0 12px;">
              Detalii comandă
            </h2>

            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:16px;">
              <tr>
                <td style="color:#666; padding:6px 0; width:40%;">Pachet:</td>
                <td style="color:#111; text-align:right; padding:6px 0;"><strong>${metadata.product_name}</strong></td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">Durată:</td>
                <td style="color:#111; text-align:right; padding:6px 0;"><strong>${metadata.product_durata || "-----"}</strong></td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">ID plată Stripe:</td>
                <td style="color:#111; text-align:right; padding:6px 0;"><strong>${pi.id}</strong></td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">Total plătit:</td>
                <td style="color:#111; text-align:right; padding:6px 0;"><strong>${(pi.amount / 100)} ${pi.currency.toUpperCase()}</strong></td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">Ora plății:</td>
                <td style="color:#111; text-align:right; padding:6px 0;"><strong>${oraPlatii}</strong></td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:24px;">
            <h2 style="font-size:21px; color:rgb(0,157,255); margin:0 0 12px;">
              Beneficii incluse
            </h2>

            <div style="background:#eef4ff; border-left:4px solid rgb(0,157,255); padding:16px; border-radius:8px; font-size:15px; line-height:1.6; color:#333;">
              ${includeList}
            </div>
          </td>
        </tr>
        
        <tr>
          <td style="padding-bottom:16px;">
            <h2 style="font-size:21px; color:rgb(0,157,255); margin:0 0 12px;">
              Detalii client
            </h2>

            <table width="100%" style="font-size:16px;">
              <tr>
                <td style="color:#666; padding:6px 0; width:40%;">Nume:</td>
                <td style="color:#111; padding:6px 0;">${clientInfo.numeComplet}</td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">Email:</td>
                <td style="color:#111; padding:6px 0;">${clientInfo.email}</td>
              </tr>
              <tr>
                <td style="color:#666; padding:6px 0;">Telefon:</td>
                <td style="color:#111; padding:6px 0;">${clientInfo.telefon}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding-bottom:28px;">
           <h2 style="font-size:21px; color:rgb(0,157,255); margin:0 0 12px;">
                Ce urmează?
            </h2>
            <div style="background:#eef4ff; border-left:4px solid rgb(0,157,255); padding:16px; border-radius:8px;">
              <p style="margin:0; font-size:16px; line-height:1.7; color:#333;">
                Am pregătit un <strong>scurt video</strong> pentru tine cu instrucțiunile de start.<br>
                Te rog să îl urmărești înainte de apelul nostru, pentru a înțelege pașii următori și a putea stabili rapid
                toate detaliile finale.
              </p>
            </div>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding-bottom:32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
              <tr>
                <td align="center" style="background-color: rgb(0, 157, 255); border-radius:8px;">
                  <a  href="https://www.statemihai.ro/multumesc"
                     target="_blank"
                     style="display:block; width:100%; padding:18px 0; font-size:20px; font-weight:bold; color:#ffffff; text-decoration:none; border-radius:8px;">
                    Vezi video
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="font-size:16px; line-height:0.55;">
           <p style="color:#777;">Ne vedem curând!</p>
           <p><strong>Mihai State</strong></p>
          </td>
        </tr>

<tr>
  <td align="center" style="font-size:14px; color:#777; line-height:1.6;">

    <hr style="border:0; border-top:1px solid #ddd; width:90%; margin:20px auto;" />

    <div style="max-width:520px; margin:auto; text-align:center;">

      Această confirmare a fost generată automat în urma plasării unei comenzi online.<br>
      Plata a fost procesată în siguranță prin <strong>Stripe</strong>, procesator certificat PCI-DSS.

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
</table>
`;
};
