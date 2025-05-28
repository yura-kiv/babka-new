import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

type TableContextType = {
  variant?: TableVariant;
  size?: TableSize;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  fullWidth?: boolean;
};

export type TableVariant = 'default' | 'dark';
export type TableSize = 'small' | 'medium' | 'large';

export interface TableProps extends TableContextType {
  className?: string;
  children: ReactNode;
}

export interface TableHeaderProps {
  className?: string;
  children: ReactNode;
}

export interface TableBodyProps {
  className?: string;
  children: ReactNode;
  loading?: boolean;
  emptyText?: string;
}

export interface TableRowProps {
  className?: string;
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface TableCellProps {
  className?: string;
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

const TableContext = createContext<TableContextType>({
  variant: 'default',
  size: 'medium',
  striped: false,
  hoverable: false,
  bordered: false,
  fullWidth: true,
});

export const useTableContext = () => useContext(TableContext);

const Table: React.FC<TableProps> & {
  Header: React.FC<TableHeaderProps>;
  Body: React.FC<TableBodyProps>;
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
} = ({
  variant = 'default',
  size = 'medium',
  striped = false,
  hoverable = false,
  bordered = false,
  fullWidth = true,
  className,
  children,
}) => {
  return (
    <TableContext.Provider
      value={{ variant, size, striped, hoverable, bordered, fullWidth }}
    >
      <div
        className={classNames(
          s.tableWrapper,
          {
            [s.fullWidth]: fullWidth,
          },
          className
        )}
      >
        <table
          className={classNames(s.table, s[variant], s[size], {
            [s.striped]: striped,
            [s.hoverable]: hoverable,
            [s.bordered]: bordered,
          })}
        >
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
};

const TableHeader: React.FC<TableHeaderProps> = ({ className, children }) => {
  const { variant } = useTableContext();
  
  return (
    <thead className={classNames(s.tableHeader, s[`header-${variant}`], className)}>
      <tr>{children}</tr>
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ 
  className, 
  children, 
  loading = false,
  emptyText = 'No data available'
}) => {
  const isEmpty = React.Children.count(children) === 0;
  
  return (
    <tbody className={classNames(s.tableBody, className)}>
      {loading ? (
        <tr>
          <td className={s.loadingCell} colSpan={100}>
            <div className={s.loadingIndicator}>
              <div className={s.spinner}></div>
              <span>Loading...</span>
            </div>
          </td>
        </tr>
      ) : isEmpty ? (
        <tr>
          <td className={s.emptyCell} colSpan={100}>
            {emptyText}
          </td>
        </tr>
      ) : (
        children
      )}
    </tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ 
  className, 
  children, 
  active = false,
  disabled = false,
  onClick
}) => {
  return (
    <tr 
      className={classNames(s.tableRow, {
        [s.activeRow]: active,
        [s.disabledRow]: disabled,
        [s.clickableRow]: !!onClick,
      }, className)}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </tr>
  );
};

const TableCell: React.FC<TableCellProps> = ({ 
  className, 
  children,
  align = 'left',
  width
}) => {
  return (
    <td 
      className={classNames(s.tableCell, s[`align-${align}`], className)}
      style={width ? { width } : undefined}
    >
      {children}
    </td>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;
