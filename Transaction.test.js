const axios = require('axios')
const { expect } = require('chai')
const fs = require('fs')
const env = require('./env.json')
const faker = require('faker')

describe("Transaction API integration testing", () => {

    it("User Login", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/user/login`, {
            "email": "salmansrabon@gmail.com",
            "password": "1234"
        },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        console.log(response)
        env.token = response.token
        fs.writeFileSync('./env.json', JSON.stringify(env))
    })

    it("Get user list", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/user/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response)
    })

    it("Create new user", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/user/create`, {
            "name": faker.name.firstName() + " " + faker.name.lastName(),
            "email": faker.internet.email(),
            "password": "1234",
            "phone_number": faker.phone.phoneNumber(),
            "nid": Math.floor(Math.random() * (99999 - 10000) + 10000),
            "role": "Customer"
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.token,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET"
                }
            })
    })

    it("Display last created user", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/user/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response.users[response.count - 1]);
    })

    it("Create new Agent", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/user/create`, {
            "name": faker.name.firstName() + " " + faker.name.lastName(),
            "email": faker.internet.email(),
            "password": "1234",
            "phone_number": faker.phone.phoneNumber(),
            "nid": Math.floor(Math.random() * (99999 - 10000) + 10000),
            "role": "Agent"
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.token,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET"
                }
            })
    })

    it("Display last created Agent", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/user/list`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response.users[response.count - 1]);
    })

    it("Money deposit from SYSTEM", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/transaction/deposit`, {
            "from_account": "SYSTEM",
            "to_account": "01525124847",
            "amount": 3000
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.token,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET"
                }
            })
    })

    it("Get user balance after deposit", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/transaction/balance/01525124847`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response);
    })

    it("Send money from user to user", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/transaction/sendmoney`, {
            "from_account": "01525124847",
            "to_account": "01526809412",
            "amount": 800
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.token,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET"
                }
            })
    })

    it("Get user balance after send money", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/transaction/balance/01525124847`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response);
    })

    it("Cashout from user to agent", async () => {
        var { data: response } = await axios.post(`${env.baseUrl}/transaction/sendmoney`, {
            "from_account": "01526809412",
            "to_account": "01971819475",
            "amount": 300
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": env.token,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET"
                }
            })
    })

    it("Get transaction list of a user", async () => {
        const { data: response } = await axios.get(`${env.baseUrl}/transaction/statement/01525124847 `, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": env.token,
                "X-AUTH-SECRET-KEY": "ROADTOSDET"
            }
        })
        console.log(response);
    })
})