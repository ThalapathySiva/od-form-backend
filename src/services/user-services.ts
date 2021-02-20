import *as express from 'express'
import { User } from '../models/user-model'

export class UserService {

    samplejson = [
        {
            name: "siva",
            id: 10,
            email: "agksngjns@dfkbn.com"
        },
        {
            name: "ram",
            id: 11,
            email: "ijfini@dfkbn.com"
        },
        {
            name: "thalapathy",
            id: 12,
            email: "pajfpaf@dfkbn.com"
        }
    ]

    register = async (user: User) => {
        this.samplejson.forEach((element) => {
            if (element.name == user.name) {
                return "User found"
            }
        })
    }

    login = async () => {

    }

    getUser = async () => {

    }

    getUserDetail = async () => {

    }

}