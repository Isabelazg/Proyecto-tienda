import * as React from "react"
import { cn } from "@/lib/utils"

const Sidebar = React.forwardRef(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    data-slot="navbar"
    className={cn(
      "bg-white shadow-md sticky top-0 z-50",
      className
    )}
    {...props}
  />
))
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="navbar-header"
    className={cn("flex items-center", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="navbar-content"
    className={cn("flex items-center flex-1", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="navbar-footer"
    className={cn("flex items-center", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-slot="navbar-menu"
    className={cn("flex items-center space-x-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-slot="navbar-menu-item"
    className={className}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef(
  ({ className, isActive, asChild, children, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(React.Children.only(children), {
        className: cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-lime-50 text-lime-600"
            : "text-gray-700 hover:bg-lime-50 hover:text-lime-600",
          children.props.className
        ),
        ref,
        ...props,
      })
    }

    return (
      <button
        ref={ref}
        data-slot="navbar-menu-button"
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive
            ? "bg-lime-50 text-lime-600"
            : "text-gray-700 hover:bg-lime-50 hover:text-lime-600",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}
