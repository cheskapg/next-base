interface CheckboxProps {
    id: string;
    name: string;
    label: string;
    subLabel: string;
    disabled?: boolean;
    onBlur: () => void;
    checked: boolean;
    onChange: () => void;
    className?: string;
  }
  
  const Checkbox: React.FC<CheckboxProps> = ({
    id,
    name,
    label,
    subLabel,
    disabled,
    onBlur,
    checked,
    onChange,
    className,
  }) => {
    return (
      <div className={className}>
        <div className="">
          <input
            type="checkbox"
            id={id}
            name={name}
            disabled={disabled}
            onBlur={onBlur}
            checked={checked}
            onChange={onChange}
            className={`peer-not h-5 w-5 appearance-none ${checked ? "invisible" : ""} rounded-md border-hidden`}
          />
        </div>
        <div className="">

        </div>
        <div className="">
          <label htmlFor={id} className="">
            {label}
          </label>
          <label className="text-sm font-normal text-[#5e6366]">{subLabel}</label>
        </div>
      </div>
    );
  };
  
  export default Checkbox;