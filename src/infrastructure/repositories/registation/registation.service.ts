import { Endpoint } from "../../../core/common/apiLink";
import { RequestService } from "../../utils/response";
import { messageConfig } from "../../helper/message";

class RegistrationService {
    async getRegistration(params: any, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService.
                get(Endpoint.Registration.registration,
                    { ...params }
                ).then(response => {
                    return response;
                });
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
}

export default new RegistrationService();