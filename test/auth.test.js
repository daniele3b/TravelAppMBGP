/*
*    TO BE DONE
*/
const {User} = require('../../models/user');
const request = require('supertest');
let server;

describe('/auth', () => {

    let user
    let email
    let phone
    let password
    
    beforeEach( async () => {
        server = require('../../index');
        
        await User.save({
            name : 'Daniele',
            surname : 'Bufalieri',
            email : 'danielebufalieritkd@gmail.com',
            password : 'daniele',
            role:"software engineer"
        })

    });

    afterEach(async () => {
        await User.deleteMany({})
        await server.close(); 
    });

    const exec_email = () => {
        return request(server).post('/auth/email')
            .send({
                email: email,
                password: password
            })
    }


    describe("POST /email", () => {
        
        it('should return 400 if email or password is invalid', async () => {

            email = 1324
            password = 'daniele'
           
            let res = await exec_email()

            expect(res.status).toBe(400)

            email = 'danielebufalieritkd@gmail.com'
            password = 1234
           
            res = await exec_email()

            expect(res.status).toBe(400)
        })

        it('should return 400 if email is wrong', async () => {

            email = 'emailwrong@gmail.com'
            password = 'daniele'
           
            res = await exec_email()

            expect(res.status).toBe(400)
        })

        it('should return 400 if password is wrong', async () => {

            email = 'danielebufalieritkd@gmail.com'
            password = 'aCertainPassword'
           
            let res = await exec_email()

            expect(res.status).toBe(400)
        })

        it('should return 200 if email and password are correct', async () => {

            email = 'danielebufalieritkd@gmail.com'
            password = 'daniele'

            res = await exec_email()

            expect(res.status).toBe(200)
        })

    })
})
