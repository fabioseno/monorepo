export default class ExpressAdapter {

    static getStudentProfile(callback) {
        return async (req, res) => {
            try {
                const result = await callback(req.query.email);

                res.json(result);
            }
            catch (error) {
                res.status(500);
                res.json(error.message);
            }
        };
    }

    static createStudentProfile(callback) {
        return async (req, res) => {
            try {
                const result = await callback(req.body);

                res.json(result);
            }
            catch (error) {
                res.status(500);
                res.json(error.message);
            }
        };
    }
}