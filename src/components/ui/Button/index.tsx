export default function Button({
    variant = 'primary',
    outline = false,
    rounded,
    type,
    disabled,
    onClick,
    children,
    classes,
    isLoading = false,
}: any) {
    return (
        <button
            type={type ? type : 'submit'}
            disabled={disabled || isLoading ? disabled : false}
            onClick={() => (!isLoading && !disabled && onClick ? onClick() : {})}
            className={
                `w-full flex items-center justify-center font-primary font-medium transition duration-300 shadow-md text-[16px] ` +
                (isLoading ? `cursor-default ` : `cursor-pointer `) +
                (outline ? `px-5 py-[8px] ` : `px-6 py-2 `) +
                (variant == 'primary'
                    ? outline
                        ? isLoading
                            ? `border-2 border-transparent bg-primary-500 `
                            : `border-2 border-primary-500 hover:bg-primary-500 hover:text-light-100 text-primary-500 `
                        : (isLoading ? `bg-primary-300 ` : `bg-primary-500 hover:bg-primary-600 `) + `text-light-100 `
                    : variant == 'secondary'
                    ? outline
                        ? isLoading
                            ? `border-2 border-transparent bg-dark-200 `
                            : `border-2 border-primary-800 hover:bg-primary-800 hover:text-light-100 text-primary-800 `
                        : (isLoading ? `bg-dark-200 ` : `bg-primary-800 hover:bg-dark-700 `) + `text-light-100 `
                    : variant == 'tertiary'
                    ? outline
                        ? isLoading
                            ? `border-2 border-transparent bg-primary-200 `
                            : `border-2 border-primary-800 hover:bg-primary-400 hover:text-light-100 text-primary-500 `
                        : (isLoading ? `bg-dark-200 ` : `bg-primary-800 hover:bg-dark-700 `) + `text-light-100 `
                    : variant == 'white'
                    ? outline
                        ? isLoading
                            ? `border-2 border-transparent bg-light-100 `
                            : `border-2 border-primary-800 hover:bg-light-100/80 text-primary-500 `
                        : (isLoading ? `bg-light-200 ` : `bg-light-100 hover:bg-light-200 `) + `text-dark-800 `
                    : ` `) +
                (rounded ? `rounded-full ` : `rounded-lg `) +
                (classes ? classes : `text-md px-8 py-2`)
            }>
            {isLoading ? (
                <span className={variant == 'primary' && outline ? 'loader-dark' : 'loader'}></span>
            ) : (
                children
            )}
        </button>
    );
}
