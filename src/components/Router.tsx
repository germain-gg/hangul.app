import React, { useContext } from "react";
import {AppContext} from "../utils/utils";

export function Router({ children }: any):JSX.Element {
  const { activePath } = useContext(AppContext);
  return (
    React.Children.map(children, component => {
      if (component.props.path === activePath) {
        return component;
      } else {
        return null;
      }
    })
  )
}

export function Route({ children }: RouteProps):JSX.Element {
  return children;
}

type RouteProps = {
  children: JSX.Element
  path: string
}
