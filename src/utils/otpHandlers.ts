export const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    otp: string[],
    setOtp: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const value = event.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
    }
};

export const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
    otp: string[],
    setOtp: React.Dispatch<React.SetStateAction<string[]>>
) => {
    if (event.key === "Backspace") {
        let newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);

        if (index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
            if (prevInput) prevInput.focus();
        }
    }
};

export const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    setOtp: React.Dispatch<React.SetStateAction<string[]>>
) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text");
    if (!/^\d{6}$/.test(pastedData)) return;

    const otpArray = pastedData.split("");
    setOtp(otpArray);

    setTimeout(() => {
        document.getElementById(`otp-5`)?.focus();
    }, 10);
};
