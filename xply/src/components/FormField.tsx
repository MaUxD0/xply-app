

interface FormFieldProps {
  type: string;
  placeholder: string;
  icon: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormField({
  type,
  placeholder,
  icon,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="text-left mb-4">
      <label className="flex items-center gap-2 text-gray-300 text-sm">
        <span className="material-symbols-outlined text-white text-lg">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent border-b border-gray-500 focus:outline-none text-white placeholder-gray-400 text-sm py-1"
        />
      </label>
    </div>
  );
}