'use client'
import GetUser from '@/components/User/GetUser'
import store from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const ClientBody = ({ children }) => {
    return (
        <Provider store={store}>
            <GetUser>
                {children}
            </GetUser>
        </Provider>
    )
}

export default ClientBody
