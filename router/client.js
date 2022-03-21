const express = require('express');
const ClientRouter = express.Router();
const passport = require("passport");
var LocalStrategy = require('passport-local');
const SchoolUser = require('../models').School_dept_User;
const Class = require("../models").Class;
const ClassSection = require("../models").section;
const BirthCertificate = require('../models').BirthCertificate;
const Fees = require('../models').Yearlyfess;
const PaymentStote = require('../models').PaymentStorage;
const Application = require('../models').AdmissionApplication;
const ClassAssign = require('../models').ClassAssignForStudent;
const auth = require('../middleware/Auth');
const multer = require('multer');
var path = require('path');
const fs = require("fs");
const invoice = fs.readFileSync('./views/client/invoice.hbs', 'utf8');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const pdf2base64 = require('pdf-to-base64');
const pdf = require('dynamic-html-pdf');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage });

ClientRouter.get('/test', async (req, res) => {
  res.render("client/invoice.hbs")
})

ClientRouter.post('/upload/', upload.single('birth_certificate'), auth, async (req, res, next) => {
  let birthcertificate_name = req.file ? req.file.originalname : null;
  let path_location = req.file.path;
  let mime_type = req.file.mimetype;
  let user_Id = req.body.userId;
  let Certificate = await BirthCertificate.create({ userId: user_Id, birthcertificate: birthcertificate_name, pathlocation: path_location, mime_type: mime_type })
  await SchoolUser.update({ birth_certificate: Certificate.id }, { where: { id: user_Id } })

  res.redirect('/upload_birth_certificate_to_verify_student')

})



ClientRouter.get('/getCertificate/:id', auth, async (req, res) => {
  let Certificae = await BirthCertificate.findOne({ where: { id: req.params.id } })
  res.json(Certificae)
})

ClientRouter.get("/upload_birth_certificate_to_verify_student", auth, async (req, res) => {
  res.render("client/uploadBirthCertificate.hbs", { title: 'Upload Birth Certificae' })
})

ClientRouter.get("/admission", auth, async (req, res) => {
  Fees.belongsTo(Class, {
    foreignKey: 'ClassID'
  });

  let Openadmission = await Fees.findAll({
    include: [{ model: Class }]
  })
  res.render("client/admission.hbs", { title: 'Admission', Openadmission })

})


ClientRouter.get("/profile", auth, async (req, res) => {
  res.render("client/userdetails.hbs", { title: "Profile" })
})



ClientRouter.post("/payment", auth, async (req, res) => {
  let paymentType = req.body.payment;
  let payment_STATUS = paymentType;
  let { razorpay_payment_id, razorpay_order_id, razorpay_signature, buyerId, Admissionid, cost, razorpay_error_code } = req.body;
  let paymentDetails = { razorpay_payment_id, razorpay_order_id, razorpay_signature, buyerId, Admissionid, cost, razorpay_error_code, payment_STATUS }
  PaymentStote.create(paymentDetails)
  if (paymentType == 'succsess') {
    let App = { buyerId, Admissionid, cost, razorpay_payment_id }
    let ApplicationCreate = await Application.create(App)
    console.log(ApplicationCreate)



    let student = await SchoolUser.findOne({ where: { id: buyerId } })
    Fees.belongsTo(Class, {
      foreignKey: 'ClassID'
    });
    let YearlyFee = await Fees.findOne({
      where: { id: Admissionid },
      include: [{ model: Class }]
    })
    const pdf_name = `${student.dataValues.firstName}-${razorpay_payment_id}-invoice.pdf`;
    const invoice_no = `FEES/Admission/${YearlyFee.dataValues.Year}/${YearlyFee.dataValues.Class.dataValues.name}/${razorpay_payment_id}`;

    let A4options = await {
      format: "A4",
      orientation: "portrait",
      border: "1mm"
    };

    let pdfbill = {
      template: invoice,
      context: {
        invoice: invoice_no,
        invoice_date: new Date(),
        firstName: student.dataValues.firstName,
        lastName: student.dataValues.lastName,
        Address: student.dataValues.address,
        email: student.dataValues.email,
        Amt: cost,
        service: `Admission of Class ${YearlyFee.dataValues.Class.dataValues.name}  Batch year ${YearlyFee.dataValues.Year} `,
      },
      path: "./public/invoice_file/" + pdf_name
    };
    await pdf.create(pdfbill, A4options)
    await Application.update({ invoice_file: `./invoice_file/${pdf_name}` },
      {
        where: {
          id: ApplicationCreate.id
        }
      })

    const base64Str = await pdf2base64("./public/invoice_file/" + pdf_name);

    const attachments = [
      {
        content: base64Str,
        filename: 'Payment_Recipt.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ];

    let Email = `${student.dataValues.email}`
    console.log(Email)
    const msg = {
      to: Email,
      from: 'sourav.g@legalkart.com', // Use the email address or domain you verified above
      subject: `Hi ${student.dataValues.firstName},Purchase Invoice`,
      text: `Hi ${student.dataValues.firstName} ${student.dataValues.lastName}, <br> Your Admission for <b>Class ${YearlyFee.dataValues.Class.dataValues.name}</b> <br> Year ${YearlyFee.dataValues.Year} <br> Paid  <b>Rs. ${cost}</b> `,
      html: `<p>Hi ${student.dataValues.firstName} ${student.dataValues.lastName}, <br> Your Admission for <b>Class ${YearlyFee.dataValues.Class.dataValues.name}</b> <br> Year ${YearlyFee.dataValues.Year} <br> Paid  <b>Rs. ${cost}</b></p>`,
      attachments,
    };



    sgMail
      .send(msg)
      .then(() => { }, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });

    res.redirect("/AdmissionApplication")
  } else {

    let student = await SchoolUser.findOne({ where: { id: buyerId } })
    Fees.belongsTo(Class, {
      foreignKey: 'ClassID'
    });
    let YearlyFee = await Fees.findOne({
      where: { id: Admissionid },
      include: [{ model: Class }]
    })

    let Email = `${student.dataValues.email}`
    console.log(Email)
    const msg = {
      to: Email,
      from: 'sourav.g@legalkart.com', // Use the email address or domain you verified above
      subject: `Hi ${student.dataValues.firstName},Your payment is ❌ Failed `,
      text: `Hi ${student.dataValues.firstName} ${student.dataValues.lastName}, <br> Your Admission for <b>Class ${YearlyFee.dataValues.Class.dataValues.name}</b> <br> Year ${YearlyFee.dataValues.Year} <br> is ❌ Failed `,
      html: `<p>Hi ${student.dataValues.firstName} ${student.dataValues.lastName}, <br> Your Admission for <b>Class ${YearlyFee.dataValues.Class.dataValues.name}</b> <br> Year ${YearlyFee.dataValues.Year} <br> is ❌ Failed.Retry to Pay Again`,
    };



    sgMail
      .send(msg)
      .then(() => { }, error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body)
        }
      });
    res.redirect('/admission')
  }
})

ClientRouter.post("/profileupadate/:id", auth, async (req, res) => {
  let user = req.params.id
  let { firstName, lastName, guardianName, contact, gender, email } = req.body;
  await SchoolUser.update({ firstName, lastName, guardianName, contact, gender, email }, { where: { id: user } })
  res.redirect("/profile")
})

ClientRouter.get("/admission_history/:id", async (req, res) => {
  Application.belongsTo(Fees, {
    foreignKey: 'Admissionid'
  })
  Fees.belongsTo(Class, {
    foreignKey: 'ClassID'
  });


  let admission_history_by_user = await Application.findAll(
    {
      include: [{
        model: Fees, attributes: ["id", "ClassID", "Year"],
        include: [{ model: Class, attributes: ["id", 'name'] }]
      }],
      where: {
        buyerId: req.params.id
      },
    })

  res.json(admission_history_by_user)
})

ClientRouter.get("/admission_history", auth, async (req, res) => {
  res.render("client/admission_history.hbs", { title: 'Admission History' })
})

ClientRouter.get("/studentrollno/:id", async (req, res) => {
  ClassAssign.belongsTo(ClassSection, {
    foreignKey: 'SectionId'
  })
  ClassSection.belongsTo(Class,{
    foreignKey:'classId'
  })


  let StudentAdmition = await ClassAssign.findAll(
    {
      include: [{
        model: ClassSection,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },include:[{model:Class,attributes: {
          exclude: ['createdAt', 'updatedAt']
        }}]
      }],
      where: { StudentId: req.params.id },attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    }

  )
  res.json(StudentAdmition)
})


ClientRouter.get("/student_current_roll_no/:id", async (req, res) => {
  ClassAssign.belongsTo(ClassSection, {
    foreignKey: 'SectionId'
  })
  ClassSection.belongsTo(Class,{
    foreignKey:'classId'
  })


  let StudentAdmition = await ClassAssign.findAll(
    {
      include: [{
        model: ClassSection,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },include:[{model:Class,attributes: {
          exclude: ['createdAt', 'updatedAt']
        }}]
      }],
      where: { id: req.params.id },attributes: {
        exclude: ['createdAt', 'updatedAt']
    },
    }

  )
  res.json(StudentAdmition)
})




module.exports = ClientRouter

