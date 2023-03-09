export default function Button({
    variant = 'primary',
    outline = false,
    type,
    disabled,
    onClick,
    children,
    classes,
    rounded,
    isLoading = false,
}: any) {
    return (
        <button
            type={type ? type : 'submit'}
            disabled={disabled ? disabled : false}
            onClick={() => (onClick ? onClick() : {})}
            className={
                `w-full flex items-center justify-center ` +
                (isLoading ? `cursor-default ` : `cursor-pointer `) +
                (variant == 'primary'
                    ? (outline
                          ? isLoading
                              ? `border-2 border-transparent bg-primary-200 `
                              : `border-2 border-primary-400 hover:bg-primary-400 hover:text-light-100 text-primary-500 `
                          : (isLoading ? `bg-dark-200 ` : `bg-primary-800 hover:bg-dark-700 `) + `text-light-100 `) +
                      `font-primary font-semibold transition duration-300 shadow-lg `
                    : (variant = 'secondary'
                          ? (outline
                                ? isLoading
                                    ? `border-2 border-transparent bg-secondary-200 `
                                    : `border-2 border-secondary-400 hover:bg-secondary-400 hover:text-light-100 text-secondary-500 `
                                : (isLoading ? `bg-secondary-300 ` : `bg-secondary-400 hover:bg-secondary-600 `) +
                                  `text-light-100 `) + `font-primary font-semibold transition duration-300 `
                          : ` `)) +
                (rounded ? `rounded-full ` : `rounded-xl `) +
                (classes ? classes : `text-md px-8 py-3`)
            }>
            {isLoading ? (
                <span className={variant == 'primary' && outline ? 'loader-dark' : 'loader'}></span>
            ) : (
                children
            )}
        </button>
    );
}
