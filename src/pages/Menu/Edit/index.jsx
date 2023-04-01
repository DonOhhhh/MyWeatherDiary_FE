import {
    ErrorMessage,
    Field,
    FieldArray,
    Form,
    Formik,
    useFormik,
} from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as Yup from "yup";
import FormError from "../../../common/components/FormError";
import { added } from "../Diarys/reducer/diarysSlice";

function EditPage() {
    const initialValues = useSelector((state) => state.edit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (values) => {
        dispatch(added(values));
        navigate("/main/diarys");
    };
    const validationSchema = Yup.object({
        date: Yup.date().required("Date Required"),
        emotion: Yup.number()
            .min(0, "Can't drop under 0")
            .max(3, "Can't rise over 3")
            .required("Emotion Required"),
        contents: Yup.array()
            .min(1, "최소 1개 이상의 일기가 필요합니다.")
            .required("Contents Required!"),
    });
    const defaultContent = (id) => ({
        id,
        imgSrc: "",
        comment: "",
    });
    let pushFunction;
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            // validationSchema={validationSchema}
        >
            {({ values }) => (
                <Form>
                    <div role="group" aria-labelledby="Date-box">
                        <label>
                            <Field type="date" name="date" />
                            Date
                        </label>
                        <ErrorMessage name="date" component={FormError} />
                    </div>

                    <div role="group" aria-labelledby="Emotion-box">
                        <label>
                            <Field type="radio" name="emotion" value="0" />
                            sunny
                        </label>
                        <label>
                            <Field type="radio" name="emotion" value="1" />
                            cloudy
                        </label>
                        <label>
                            <Field type="radio" name="emotion" value="2" />
                            rainy
                        </label>
                        <label>
                            <Field type="radio" name="emotion" value="3" />
                            thunder
                        </label>
                        <ErrorMessage name="emotion" component={FormError} />
                    </div>
                    <div role="group" aria-labelledby="Content-box">
                        <FieldArray name="contents">
                            {(fieldArrayProps) => {
                                const { remove, push, form } = fieldArrayProps;
                                pushFunction = push;
                                const { contents } = form.values;
                                return (
                                    <>
                                        {contents.map(
                                            (
                                                { id, imgSrc, comment },
                                                index
                                            ) => (
                                                <div key={index}>
                                                    <button onClick={remove}>
                                                        -
                                                    </button>
                                                    <br />
                                                    <Field
                                                        type="file"
                                                        name={`contents[${index}].imgSrc`}
                                                        accept="image/*"
                                                        multiple
                                                    />
                                                    <br />
                                                    <Field
                                                        as="textarea"
                                                        name={`contents[${index}].comment`}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </>
                                );
                            }}
                        </FieldArray>
                        <ErrorMessage name="contents" component={FormError} />
                    </div>
                    <div role="group" aria-labelledby="Button-box">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                pushFunction(defaultContent(v4()));
                            }}
                        >
                            Add
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default EditPage;
