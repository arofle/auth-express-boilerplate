import User from "../models/userModel.js";

export async function periodicallyDeleteUnconfirmedAccounts() {
    const day = 1000 * 60 * 60 * 24
    setInterval(async () => {
        try {
            const usersToDelete = await User.findAll({ where: { emailConfirmed: false } })
            usersToDelete.map(async user => await user.destroy())
            console.info('Function periodicallyDeleteUnconfirmedAccounts is called');
        } catch (error) {
            console.log(error);
        }
    }, day)
}

