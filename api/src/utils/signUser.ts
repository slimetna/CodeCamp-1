import userModel from '../db/models/user.model';
const axios = require('axios');

export default async function signUser() {

    const token: string = "authenticator=eyJpZGVudGl0eSI6ImV5SnBaQ0k2TXprMk1UUXNJbXh2WjJsdUlqb2lZbkoxYm1WMFgyVWlMQ0psYldGcGJDSTZJbUp5ZFc1bGRGOWxRR1YwYm1FdFlXeDBaWEp1WVc1alpTNXVaWFFpTENKc2IyZGhjeUk2Wm1Gc2MyVXNJbWR5YjNWd2N5STZXeUp6ZEhWa1pXNTBJbDBzSW14dloybHVYMlJoZEdVaU9pSXlNREl5TFRFeUxUQTFJREV5T2pRek9qTTVJbjA9Iiwic2lnbmF0dXJlIjoiVGlseW0raExvZFJmSFErVnR6dmNxbVR6amxpTThndFU2TWxKSU1Uenl0a0pSVTNsdjNzM2ZNMFBWbllkcllZMDRDeEdYdmtnMCtEcE9YMVZMcUVhUE5wSWxYSjJcL0YwVlkwQllcL3ZrREJnMXBxWnVLaU02eXlid1BlckZtaEJpTWpOYzVzSHhKdElKUmZuTDY4cWFham12SUZtZHE3ZWY5cFwvR2UrWGxOc0RoOXlWYlFuN21PMktDSDhWbkxiZ2lrYnBXYWpONXJUanNaSWtZb2hUTWRXcXo1S0hWazFpVGlGMHgweUM2ZVdnb0FQZmdTd0NJcDFmYnczUnZUeGRiMUsyMndUSlBndnA0VjZOTGVjMFR6M2Q2b1RQUUdpazNLMnUwbzIyTnZBWUQxSmFxTXRKSm9YTFwvelZ2dmRGb1hpMmVKZjBNY29BMXVFTGJjdUZjcElkQ0RZdjNQUkpcL05xcXRYV1N2MCtjVGNTZmtnSTNmeWVrVjFCWENuZWRCZWliaytiR0NYdEpiVnU3dm1TYWNYaDVjMU9cLzNBWk5OUkxyVU9Fa0xiQXViXC8xSGdYWVR1SHBuRmRLQVZSNCtNdFQ1aEdoOGFWcnFhekl4N1dtbVVwREw4MmNDbzJSa3ViTGMxVk9sOWFjN2xyTUdDejJFNWRrV2o0b0tDSm9STjRveFwvUW9QbWY3Ukk4NkVyM3lpR3EySFdiZ2YwZmlINkVHRkNWbUpQMUtjSnZRSEJkck9tTnhPMDc3a1wvcXhweVBqcml4KytxeFJ0aXVCVWdXWEM4b3FoU083TldFb0FpRHRnbzZ5UUR6d01vcUVpS3lxYTlhQUI0UCt5VlUzOHBWZm51eVhtc2JmTmFCU0ZRekRQS0tHdWMwZGlzdXRDS25RMlN1TnNxd3ZQMGc9In0%3D; expires=Tue, 06-Dec-2022 02:00:00 GMT; Max-Age=51381; path=/; domain=.etna-alternance.net; secure; httponly"

    const response = await axios.get('https://intra-api.etna-alternance.net/trombi',{
        headers: {
            Cookie: token
        }
    });

    for(let i=0; i<response.data.length; i++) {
        const user = response.data[i];
        const userExists = await userModel.findOne({id: user.id});
        if(!userExists) {
            const newUser = new userModel({
                login: user.login,
                firstname: user.firstname,
                lastbame: user.lastname,
            });
            await newUser.save();
        }
    }
    
    const data: any = response.data;

    const newUser = new userModel({
        id: data.id
    });

    await newUser.save();

};