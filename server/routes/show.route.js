const { authenticate } = require("../config/jwt.config")
const ShowController = require("../controllers/show.controller")

module.exports = (app)=>{
    app.post("/api/show", ShowController.createShow)
    app.get("/api/show/:name", ShowController.getOneShow)
    app.get("/api/showsbyuser/:username", authenticate, ShowController.getAllShowsByUser)
    app.post("/api/test", authenticate, ShowController.saveOrUpdate )
    app.post("/api/edit/:name", authenticate, ShowController.deleteShow)
}