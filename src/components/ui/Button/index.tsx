export default function Button({
    primary = false,
    secondary = false,
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
                (primary
                    ? (outline
                          ? isLoading
                              ? `border-2 border-transparent bg-primary-200 `
                              : `border-2 border-primary-400 hover:bg-primary-400 hover:text-light-100 text-primary-500 `
                          : (isLoading ? `bg-dark-200 ` : `bg-dark-400 hover:bg-dark-700 `) + `text-light-100 `) +
                      `font-primary font-semibold transition duration-300 `
                    : secondary
                    ? (outline
                          ? isLoading
                              ? `border-2 border-transparent bg-secondary-200 `
                              : `border-2 border-secondary-400 hover:bg-secondary-400 hover:text-light-100 text-secondary-500 `
                          : (isLoading ? `bg-secondary-300 ` : `bg-secondary-400 hover:bg-secondary-600 `) +
                            `text-light-100 `) + `font-primary font-semibold transition duration-300 `
                    : ` `) +
                (rounded ? `rounded-full ` : `rounded-lg `) +
                (classes ? classes : `text-lg px-8 py-2`)
            }>
            {isLoading ? <span className={primary && outline ? 'loader-dark' : 'loader'}></span> : children}
        </button>
    );
}
