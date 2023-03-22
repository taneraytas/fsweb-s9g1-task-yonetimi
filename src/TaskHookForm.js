import React from "react";

import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";

export default function TaskHookForm({ kisiler, submitFn, success }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      people: [],
    },
  });
  function submitForm(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitForm)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          name="title"
          type="text"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="input-error">bu alani doldurmak zorunludur</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          name="description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && (
          <p className="input-error">bu alani bos birakmayiniz</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", { required: true })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">checkboxi bos birakmayiniz</p>
        )}
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
          onClick={success}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
