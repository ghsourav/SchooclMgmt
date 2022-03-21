const express = require('express');
const AuthLoginRouter = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
var LocalStrategy = require('passport-local');
const session = require('express-session');
const passport = require("passport");
const SchoolUser = require('../models').School_dept_User;
const Section = require("../models").section;
const Class = require("../models").Class;
const BirthCertificate = require('../models').BirthCertificate;
const Fees = require('../models').Yearlyfess;
const PaymentStote = require('../models').PaymentStorage;
const Application = require('../models').AdmissionApplication;
const ClassAssign = require('../models').ClassAssignForStudent;

const bCrypt = require('bcrypt');
var randomstring = require("randomstring");
const auth = require('../middleware/Auth');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');



AuthLoginRouter.use(bodyParser.urlencoded({ extended: true }));
AuthLoginRouter.use(passport.initialize());
AuthLoginRouter.use(passport.session());

AuthLoginRouter.get("/", async (req, res) => {
    var msg = req.flash('loginMessage')[0];
    res.render("admin/login/auth-login.hbs", { title: 'Login',message: msg })
})



AuthLoginRouter.post('/school_login', passport.authenticate('local', {
    successRedirect: '/dashboard', // redirect to the secure profile section
    failureRedirect: '/', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}),
    function (req, res) {

    });


AuthLoginRouter.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

AuthLoginRouter.get("/dashboard", auth, async (req, res) => {
    var msg = req.flash('loginMessage')[0];
    res.render("admin/dashboard.hbs", { title: 'Dashboard',message:msg })
})
AuthLoginRouter.get("/mgmtclass", auth, async (req, res) => {
    let clas = await Class.findAll({ attributes: ['id', 'name'] })
    res.render("admin/mgmtclass.hbs", { title: 'Admin Class manegment', clas })
})

AuthLoginRouter.get("/mgmtsection", auth, async (req, res) => {
    Section.belongsTo(Class, {
        foreignKey: 'classId'
    });
    let clas = await Class.findAll({ attributes: ['id', 'name'] })
    let section = await Section.findAll({
        include: [{ model: Class }]
    }
        // {attributes: ['id','name']}
    )

    res.render("admin/mgmtsection.hbs", { title: 'Admin Section manegment', section, clas })
})

AuthLoginRouter.get("/user/:username", auth, async (req, res) => {
    let user = await SchoolUser.findOne({ where: { username: req.params.username } })
    res.json(user)
})

AuthLoginRouter.post("/mgmtsectionAdd", auth, async (req, res) => {
    let { name, classId } = req.body;
    let mgmtsectionAdd = { name, classId }
    await Section.create(mgmtsectionAdd)
    res.redirect('/mgmtsection')
})

AuthLoginRouter.post("/updateSection/:id", auth , async (req,res) => {
    await Section.update({name:req.body.name},{where:{id:req.params.id}})
})

AuthLoginRouter.post("/mgmtclassadd", auth, async (req, res) => {
    let { name } = req.body;
    let mgmtclassAdd = { name };
    await Class.create(mgmtclassAdd)
    res.redirect("/mgmtclass")
})

AuthLoginRouter.post("/mgmtclassupdate/:id",auth,async(req,res) => {
    let ClassId = req.params.id;
    let name = req.body.name;

    await Class.update(
        {name:name},{where:{id:ClassId}})

})


AuthLoginRouter.post("/student_create", auth, async (req, res) => {
    let random_pass = randomstring.generate({
        length: 12,
        charset: 'alphabetic'
    });
    let is_blacklisted = false;
    let isActive = false;
    let dept_user_type = "STUDENT"
    let password = bCrypt.hashSync(random_pass, 10);
    let { firstName, lastName, email, gender, guardianName, username, contact, student_add_by_admin } = req.body;
    let student_create = { firstName, lastName, email, guardianName, password, isActive, dept_user_type, gender, username, contact, is_blacklisted, student_add_by_admin }
    await SchoolUser.create(student_create)


    console.log(random_pass)
    const email_body = `<p>Hi,${firstName} ${lastName} ,<br> Your Login is <b>Email- ${email}</b> & <b>Password is <b>${random_pass}</b></b></p>`
    const recipient = email;
    const subject = `Hi,${firstName},Your Profile is Created`;
    const msg = {
        to: recipient,
        from: 'sourav.g@legalkart.com', // Use the email address or domain you verified above
        subject: subject,
        text: `Hi,${firstName} ${lastName} ,<br> Your Login is  ${email} Password is ${random_pass}`,
        html: email_body,
    };

    sgMail
        .send(msg)
        .then(() => { }, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });

    res.redirect("/mgmtstudent")
})

AuthLoginRouter.post("/changeuserpassword/:id", auth, async (req, res) => {
    let pass = req.body.password;
    console.log(pass)
    let password = bCrypt.hashSync(pass, 10);
    console.log(password)
    await SchoolUser.update({ password }, { where: { id: req.params.id } })
    res.redirect("/profile")
})

AuthLoginRouter.get("/mgmtstudent", auth, async (req, res) => {
    let student = await SchoolUser.findAll({ where: { dept_user_type: 'STUDENT', isActive: false } })
    let studentVerifyed = await SchoolUser.findAll({ where: { dept_user_type: 'STUDENT', isActive: true } })
    res.render("admin/mgmtstudent.hbs", { title: 'Admin Student', student, studentVerifyed })
})



AuthLoginRouter.get("/verify_Student", auth, async (req, res) => {
    SchoolUser.belongsTo(BirthCertificate, {
        foreignKey: 'birth_certificate'
    })
    let certificateVerified = await SchoolUser.findAll({ where: { dept_user_type: 'STUDENT', isActive: true } })
    let certificate = await SchoolUser.findAll(
        {
            where:
                { dept_user_type: 'STUDENT', isActive: false }
        },
        {
            include: [{ model: BirthCertificate }]
        })

    res.render("admin/verify.hbs", { title: "Verify User", certificate, certificateVerified })
})

AuthLoginRouter.get("/verifyStudent/:id", auth, async (req, res) => {
    let user = req.params.id
    await SchoolUser.update({ isActive: true }, { where: { id: user } })
    res.redirect("/verifyStudent")
})

//Yearly Fees

AuthLoginRouter.get('/mgmtfees', auth, async (req, res) => {
    let message = req.flash('msg')

    Fees.belongsTo(Class, {
        foreignKey: 'ClassID'
    });
    Fees.belongsTo(SchoolUser, {
        foreignKey: 'last_update_by'
    });
    let Feelist = await Fees.findAll({
        include: [{ model: Class }, { model: SchoolUser }]
    })
    let clas = await Class.findAll({ attributes: ['id', 'name'] })
    res.render("admin/mgmtfee.hbs", { title: "Fees", Feelist, clas,message })
})

AuthLoginRouter.post('/addclassfees', auth, async (req, res) => {
    let { ClassID, Year, cost, last_update_by, AddedBy } = req.body;
    let addFee = { ClassID, Year, cost, last_update_by, AddedBy };
    await Fees.create(addFee)
    req.flash('msg','Added Successfully')
})

AuthLoginRouter.post('/updateclassfee/:id',auth, async(req,res)=>{
    let FeeID = req.params.id;
    let acost = req.body.cost;
    console.log(FeeID)
    console.log(acost)
    console.log(req.body.last_update_by)
    await Fees.update({ cost:acost , last_update_by:req.body.last_update_by}, { where: { id: req.params.id} })
    req.flash('msg','Update Successfully')
})

AuthLoginRouter.get("/mgmtpayment", auth, async (req, res) => {
    PaymentStote.belongsTo(Fees, {
        foreignKey: 'Admissionid'
    });
    PaymentStote.belongsTo(SchoolUser, {
        foreignKey: 'buyerId'
    });
    Fees.belongsTo(Class, {
        foreignKey: 'ClassID'
    });

    let AllTrx = await PaymentStote.findAll({
        include: [{ model: SchoolUser }, {
            model: Fees,
            include: [{ model: Class }]
        }],
        order: [['id','DESC']]
               

    })
    res.render("admin/mgmtpayment.hbs", { title: 'Admin PaymentList', AllTrx })
})

AuthLoginRouter.get("/pending-assign-admission", auth, async (req, res) => {
    let message = req.flash('msg')
    Application.belongsTo(SchoolUser, {
        foreignKey: 'buyerId'
    })
    Application.belongsTo(Fees, {
        foreignKey: 'Admissionid'
    })
    Application.belongsTo(ClassAssign,{
        foreignKey:'ClassAssignForStudentsID'
    })
    ClassAssign.belongsTo(Section,{
        foreignKey:'SectionId'
    })
    Fees.belongsTo(Class, {
        foreignKey: 'ClassID'
    })

    let AssignClass = await Application.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include: [{model: ClassAssign,attributes:['StudentRollNo'],include:[{model:Section,attributes:['name']}]},{
            model: SchoolUser,
            attributes: ['firstName', 'lastName','id', 'email','StudentClassAssignDetails']
        },{
            model: Fees,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'cost', 'AddedBy', 'duedate', 'last_update_by']
            }, include: [{
                model: Class, attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
            }]
        }],        order: [['id','DESC']]

    })
    //res.json(AssignClass)
    res.render("admin/pending-assign-admission.hbs", { title: 'Admin PaymentList', AssignClass,message })
})

AuthLoginRouter.get("/section_find/:id", auth, async (req, res) => {
    let ClassSection = await Section.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }, where: { classId: req.params.id }
    })
    res.json(ClassSection)
})

AuthLoginRouter.post("/ClassAssignForStudent", auth, async (req, res) => {
    //let { SectionId, StudentId, BatchYear, StudentRollNo } = req.body;
    let Abc = await ClassAssign.findAll(
        {
            where:
                { 
                    BatchYear: req.body.BatchYear,
                    StudentRollNo: req.body.StudentRollNo,
                    SectionId: req.body.SectionId,
                }
        })

    let lengthofAbc = Abc.length

    
    if(lengthofAbc == 0){
        let { SectionId, StudentId, BatchYear, StudentRollNo } = req.body;
        let Assign = { SectionId, StudentId, BatchYear, StudentRollNo };
        let AssignClass = await ClassAssign.create(Assign)
        console.log(Assign)
        await SchoolUser.update({StudentClassAssignDetails:AssignClass.id},{where:{id:req.body.StudentId}})
        await Application.update({ClassAssignForStudentsID:AssignClass.id},{where:{id:req.body.ThisRowID}})
        req.flash('msg','Succsefully Added')
        console.log(`Succsefully Added`)
        res.redirect('/pending-assign-admission')

    }else{
        req.flash('msg','Roll No in Section Already Exists')
        res.redirect('/pending-assign-admission')
        console.log(`Roll No Already Exists`)
    }
})







module.exports = AuthLoginRouter;