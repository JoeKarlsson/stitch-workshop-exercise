const index = require("./index")
// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new index.default()
    })

    test("0", async () => {
        await inst.componentDidMount()
    })
})
