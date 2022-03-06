const user=require('../models/UserModel');
const nodemailer = require("nodemailer");

// get user
 exports.getUser= async (req,res,next)=>{
    id_user=req.params.id_user;
    const ress= await user.getUser(id_user);
    rows = ress[0];
    if(rows.length !== 0)
    {
         res.json({
            succes: true,
            user: rows,
        });

    } else 
     {
        res.json({
            succes: false,
            message: 'aucune utilisateur',
        });
     }
    }


    // invite 
     exports.InvitUser= async (req,res,next)=>{

    lastName =req.body.lastName;
    firstName  =req.body.firstName ;
    email  =req.body.email ;
    type  =req.body.type ;
    invitation  ="Pending";
    let date_ob = new Date();
    creationDate  =date_ob;
    id_classe=req.body.id_classe ;

  

    const ress= await user.InvitUser(lastName ,firstName ,email,type ,invitation ,creationDate,id_classe);
    rows = ress[0];

    console.log(rows);
    
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "wajih12333@gmail.com",
        pass: 'passss'
      }
    });

   
    
    let mail = {
        receiverName: lastName + ' ' + firstName,
        receiverMail: email
    };
   
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: transporter.options.auth.user, // sender address
      to: mail.receiverMail, // list of receivers
      subject: "Inscription Classtrack 📢", // Subject line
      html: `
          <!DOCTYPE html>
      <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <title></title>
      <link
      href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
      rel="stylesheet" media="screen">
      <style>
      .hover-underline:hover {
        text-decoration: underline !important;
      }

      @media (max-width: 600px) {
        .sm-w-full {
          width: 100% !important;
        }

        .sm-px-24 {
          padding-left: 24px !important;
          padding-right: 24px !important;
        }

        .sm-py-32 {
          padding-top: 32px !important;
          padding-bottom: 32px !important;
        }

        .sm-leading-32 {
          line-height: 32px !important;
        }
      }
      </style>
      </head>

      <body
      style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
      <div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en"
      style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
      <table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
        cellspacing="0" role="presentation">
        <tr>
          <td align="center"
            style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
            <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td class="sm-py-32 sm-px-24"
                  style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                  <a href="http://localhost:4200"
                    style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
                    <img src="../assets/logo_full.png" width="155" alt="classtrack"
                      style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" class="sm-px-24"
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-24"
                        style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">
                          Bonjour</p>
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-top: 0; font-size: 24px; font-weight: 700; color: #FC7900;">
                          Cher étudiant! 👋</p>
                        <p class="sm-leading-32"
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; font-size: 24px; font-weight: 600; color: #263238;">
                          Invitation d'inscription sur la plateforme Classtrack 
                        </p>
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                          Une pré-inscription a été ajouter avec le nom et prénom <b>` +  mail.receiverName +  `</b> et l'email ` + mail.receiverMail + `
                        </p>
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; padding-bottom: 20px; padding-top: 20px; border-bottom: 1px solid rgb(185, 185, 185); border-top: 1px solid rgb(185, 185, 185);">
                          Veuillez acceder à la plateforme en cliquant sur le bouton ci-dessous pour accomplir votre inscription. 
                        </p>
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                          Clicker sur ce bouton pour accéder à la plateforme Classtrack.
                        </p>
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td
                              style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #119D90; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                              <a href="http://localhost:4200/#/register/` + rows.insertId + `"
                                style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">Inscription
                                &rarr;</a>
                            </td>
                          </tr>
                        </table>
                        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td
                              style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                              <div
                                style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                                &zwnj;</div>
                            </td>
                          </tr>
                        </table>
                        <p
                          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                          Si vous avez des questions merci de contacter <b> Mr Foulen ben Foulen </b> sur l'adresse mail <b>FoulenBenFoulen@gmail.com</b> 
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;">
                      </td>
                    </tr>
                    <tr>
                    </tr>
                    <tr>
                      <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;">
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      </div>
      </body>
      </html>
    `, // html body
    });

    res.json('success');
  } catch (error){
      console.log(error)
    res.json('fail');
  }

    }

   // Inscri user
 exports.InscriUser= async (req,res,next)=>{

    id_user=req.params.id_user;
   // photo  =req.body.photo ;
    phone  =req.body.phone ;
    birthDate  = new Date(req.body.birthDate).toISOString().split('T')[0];
    pwd  =req.body.pwd;
    invitation  ="Accomplished";
   

  

    const ress= await user.InscriUser(phone,birthDate,pwd,invitation,id_user);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'Modifier avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de la modification ',
        });
     }
    }

     // cancel Invitation
 exports.CancelInvitation= async (req,res,next)=>{

    id_user=req.params.id_user;
    invitation  ="Canceled";
   
    const ress= await user.CancelInvitation(invitation,id_user);
    rows = ress[0];
    console.log("rowss ",rows)
    if(rows.length !== 0)
    {
        res.json({
            succes:true,
            message: 'Modifier avec succès',
                 })  

    } else 
     {
        res.json({
            succes: false,
            message: 'erreur lors de la modification ',
        });
     }
    }