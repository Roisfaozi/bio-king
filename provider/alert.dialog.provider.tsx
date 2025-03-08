'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input, InputProps } from '@/components/ui/input';
import * as React from 'react';

export const AlertDialogContext = React.createContext<
  (
    params: AlertAction,
  ) => Promise<
    AlertAction['type'] extends 'alert' | 'confirm' ? boolean : null | string
  >
>(() => null!);

type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'destructive'
  | 'default'
  | 'dark';

const defaultCancelButtonText: string = 'Cancel';
const defaultActionButtonText: string = 'Okay';

export type AlertAction =
  | {
      type: 'alert';
      title: string;
      body?: string;
      cancelButton?: string;
      cancelColorVariant?: ColorVariant;
    }
  | {
      type: 'confirm';
      title: string;
      body?: string;
      cancelButton?: string;
      actionButton?: string;
      cancelColorVariant?: ColorVariant;
      actionColorVariant?: ColorVariant;
    }
  | {
      type: 'prompt';
      title: string;
      body?: string;
      cancelButton?: string;
      actionButton?: string;
      defaultValue?: string;
      cancelColorVariant?: ColorVariant;
      actionColorVariant?: ColorVariant;
      inputProps?: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >;
    }
  | { type: 'close' };

interface AlertDialogState {
  open: boolean;
  title: string;
  body: string;
  type: 'alert' | 'confirm' | 'prompt';
  cancelButton: string;
  actionButton: string;
  cancelColorVariant: ColorVariant;
  actionColorVariant: ColorVariant;
  defaultValue?: string;
  inputProps?: React.PropsWithoutRef<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >;
}

export function alertDialogReducer(
  state: AlertDialogState,
  action: AlertAction,
): AlertDialogState {
  switch (action.type) {
    case 'close':
      return { ...state, open: false };
    case 'alert':
    case 'confirm':
    case 'prompt':
      return {
        ...state,
        open: true,
        ...action,
        cancelButton:
          action.cancelButton ||
          (action.type === 'alert'
            ? defaultActionButtonText
            : defaultCancelButtonText),
        actionButton:
          ('actionButton' in action && action.actionButton) ||
          defaultActionButtonText,
        cancelColorVariant: action.cancelColorVariant || 'default',
        actionColorVariant:
          ('actionColorVariant' in action && action.actionColorVariant) ||
          'default',
      };
    default:
      return state;
  }
}

export function AlertDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(alertDialogReducer, {
    open: false,
    title: '',
    body: '',
    type: 'alert',
    cancelButton: defaultCancelButtonText,
    actionButton: defaultActionButtonText,
    cancelColorVariant: 'destructive',
    actionColorVariant: 'default',
  });

  const resolveRef = React.useRef<(tf: any) => void>();

  function close() {
    dispatch({ type: 'close' });
    resolveRef.current?.(false);
  }

  function confirm(value?: string) {
    dispatch({ type: 'close' });
    resolveRef.current?.(value ?? true);
  }

  const dialog = React.useCallback(async <T extends AlertAction>(params: T) => {
    dispatch(params);

    return new Promise<
      T['type'] extends 'alert' | 'confirm' ? boolean : null | string
    >((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  return (
    <AlertDialogContext.Provider value={dialog}>
      {children}
      <AlertDialog
        open={state.open}
        onOpenChange={(open) => {
          if (!open) close();
          return;
        }}
      >
        <AlertDialogContent asChild>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              confirm(event.currentTarget.prompt?.value);
            }}
          >
            <AlertDialogHeader>
              <AlertDialogTitle>{state.title}</AlertDialogTitle>
              {state.body ? (
                <AlertDialogDescription>{state.body}</AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            {state.type === 'prompt' && (
              <Input
                name='prompt'
                defaultValue={state.defaultValue}
                {...(state.inputProps as InputProps)}
              />
            )}
            <AlertDialogFooter>
              <AlertDialogCancel
                type='button'
                onClick={close}
                color={
                  state.type === 'alert'
                    ? state.actionColorVariant
                    : state.cancelColorVariant
                }
              >
                {state.cancelButton}
              </AlertDialogCancel>
              {state.type === 'alert' ? null : (
                <AlertDialogAction
                  type='submit'
                  onClick={() => confirm()}
                  color={state.actionColorVariant}
                >
                  {state.actionButton}
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

type Params<T extends 'alert' | 'confirm' | 'prompt'> =
  | Omit<Extract<AlertAction, { type: T }>, 'type'>
  | string;

export function useConfirm() {
  const dialog = React.useContext(AlertDialogContext);

  return React.useCallback(
    (params: Params<'confirm'>) => {
      return dialog({
        ...(typeof params === 'string' ? { title: params } : params),
        type: 'confirm',
      });
    },
    [dialog],
  );
}

export function usePrompt() {
  const dialog = React.useContext(AlertDialogContext);

  return (params: Params<'prompt'>) =>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'prompt',
    });
}

export function useAlert() {
  const dialog = React.useContext(AlertDialogContext);
  return (params: Params<'alert'>) =>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'alert',
    });
}
