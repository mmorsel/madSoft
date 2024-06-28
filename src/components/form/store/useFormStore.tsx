import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { FieldValueType } from "../types/FormType";

type FormStateType = Record<string, FieldValueType>;

interface ITimerValue {
  value?: number;
  timeIsOut?: boolean;
}

interface IUseFormStore {
  step: number;
  timer: ITimerValue | null;
  formState: FormStateType;
  setTimer: (data: ITimerValue) => void;
  setFormFieldValue: (name: keyof FormStateType, value: FieldValueType) => void;
  resetForm: () => void;
  setStep: (position: number) => void;
}

export const FIRST_FORM_STEP = 1;
const initTimer: ITimerValue = { value: 0, timeIsOut: false };

export const useFormStore = create<IUseFormStore>()(
  devtools(
    persist(
      (set) => ({
        step: FIRST_FORM_STEP,
        timer: initTimer,
        formState: {},
        setTimer: (data) =>
          set(({ timer: tm }) => ({ timer: { ...tm, ...data } })),
        setFormFieldValue: (name, value) =>
          set(({ formState: fs }) => ({ formState: { ...fs, [name]: value } })),
        setStep: (position) => set({ step: position }),
        resetForm: () =>
          set({ formState: {}, step: FIRST_FORM_STEP, timer: initTimer }),
      }),
      { name: "test_form" }
    ),
    { name: "TEST_FORM" }
  )
);
