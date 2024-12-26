import { useState } from "react";

export const useStep = (initialStep: number = 0) => {
  const [step, setStep] = useState(initialStep);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));
  const resetStep = () => setStep(0);
  const goToStep = (step: number) => setStep(step);

  return {
    step,
    nextStep,
    prevStep,
    resetStep,
    goToStep,
  };
};
