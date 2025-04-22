export let rootEl = (
    typeof document !== 'undefined'
        ? document.getElementById('root') ?? document.body
        : undefined
) as HTMLElement;

export let themeEl = (
    typeof document !== 'undefined' ? document.documentElement : undefined
) as HTMLElement;

// 👇 This is the real overlay container!
export let dialogEl = (
    typeof document !== 'undefined'
        ? document.getElementById('root-overlay') ?? document.body
        : undefined
) as HTMLElement;

export function setDialogEl(el: HTMLElement) {
  dialogEl = el;
}

export function setRootEl(el: HTMLElement) {
  rootEl = el;
  themeEl = el;
}
