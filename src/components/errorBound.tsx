import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

interface Handler {
    handleException?(error: Error, errorInfo: React.ErrorInfo): void;
}

type Comp<P> = (React.ComponentType<P> | React.SFC<P>) & Handler;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function unnamed<P>(ErrorComponent: Comp<P>) {
    return (WrappedComponent: React.ComponentType<P>) => {
        interface State {
            hasError: boolean;
        }

        class BoundedComponent extends React.PureComponent<P, State> {
            public constructor(props: P) {
                super(props);

                this.state = {
                    hasError: false,
                };
            }

            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
                this.setState({ hasError: true });

                if (ErrorComponent && ErrorComponent.handleException) {
                    ErrorComponent.handleException(error, errorInfo);
                }
            }

            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            public render() {
                const { ...otherProps } = this.props;

                if (!this.state.hasError) {
                    return (
                        <WrappedComponent {...otherProps} />
                    );
                }

                if (ErrorComponent) {
                    return (
                        <ErrorComponent
                            {...otherProps}
                        />
                    );
                }

                const defaultErrorText = '(x_x)';
                return (
                    <div>
                        { defaultErrorText }
                    </div>
                );
            }
        }

        return hoistNonReactStatics<React.ComponentType<P>, React.ComponentType<P>>(
            BoundedComponent,
            WrappedComponent,
        );
    };
}
