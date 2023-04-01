import { ErrorMessage, Field } from "formik";
import FormError from "../../../../../common/components/FormError";

export default function DateBox() {
    return (
        <div role="group" aria-labelledby="Date-box">
            <label>
                <Field type="date" name="date" />
                Date
            </label>
            <ErrorMessage name="date" component={FormError} />
        </div>
    );
}
