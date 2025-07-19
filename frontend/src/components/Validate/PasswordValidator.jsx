import React from "react";

const passwordRules = [
    {
        label: "At least 8 characters length",
        test: (pw) => pw.length >= 8,
    },
    {
        label: "At least 1 number (0...9)",
        test: (pw) => /\d/.test(pw),
    }, {
        label: "At least 1 lowercase letter (a...z)",
        test: (pw) => /[a-z]/.test(pw),
    }, {
        label: "At least 1 uppercase letter (A...Z)",
        test: (pw) => /[A-Z]/.test(pw),
    }, {
        label: "At least 1 special symbol (!...$)",
        test: (pw) => /[!@#$%^&*(),.?\":{}|<>]/.test(pw),
    },
]

const CheckIcon = ({ active }) => {
    <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        className="inline mr-2"
    >
        <circle cx="10" cy="10" r="10" fill={active ? "#22c55e" : "#d1d5db"} />
        <path
            d="M6 10.5L9 13.5L14 8.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export default function PasswordValidator({ password }) {
    return (
        <div className="rounded-lg border p-4 bg-white shadow mt-4">
            <div className="mb-2 font-semibold">Password must contains</div>
            <ul className="space-y-1">
                {passwordRules.map((rule, idx) => {
                    const passed = rule.test(password);
                    return (
                        <li
                            key={idx}
                            className={
                                passed
                                    ? "text-gray-700 font-medium"
                                    : "text-gray-400"
                            }
                        >
                            <CheckIcon active={passed} />
                            {rule.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}