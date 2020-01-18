const { Brand, Outlet, Menu } = require('./models');

var go = async() => {

    const menu = await Menu.scope({ method: ['timed', 340]}).findOne()
    console.log(menu);
    
}
go();