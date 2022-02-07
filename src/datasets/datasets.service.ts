import { Injectable } from "@nestjs/common";
import { CreateDatasetDto } from "./entities/dto/create-dataset.dto";
import { UpdateDatasetDto } from "./entities/dto/update-dataset.dto";

import { Connection } from "typeorm";

@Injectable()
export class DatasetsService {
  constructor(private connection: Connection) {}

  findAll = async () => {
    const sql = `select col.column_id, 
       col.owner as schema_name,
       col.table_name, 
       col.column_name, 
       col.data_type, 
       col.data_length, 
       col.data_precision, 
       col.data_scale, 
       col.nullable
from sys.all_tab_columns col
inner join sys.all_tables t on col.owner = t.owner and col.table_name = t.table_name
where col.owner not in ('ANONYMOUS','CTXSYS','DBSNMP','EXFSYS', 'LBACSYS', 
         'MDSYS', 'MGMT_VIEW','OLAPSYS','OWBSYS','ORDPLUGINS', 'ORDSYS','OUTLN', 
         'SI_INFORMTN_SCHEMA','SYS','SYSMAN','SYSTEM','TSMSYS','WK_TEST','WKSYS', 
         'WKPROXY','WMSYS','XDB','APEX_040000', 'APEX_PUBLIC_USER','DIP', 
         'FLOWS_30000','FLOWS_FILES','MDDATA', 'ORACLE_OCM', 'XS$NULL',
         'SPATIAL_CSW_ADMIN_USR', 'SPATIAL_WFS_ADMIN_USR', 'PUBLIC')
order by col.owner, col.table_name, col.column_id`;

    try {
      const results = await this.connection.manager.query(sql);

      return results.map((column: any) => ({
        table_title: column.TABLE_NAME,
        table_name: `${column.SCHEMA_NAME}.${column.TABLE_NAME}`,
        column_name: column.COLUMN_NAME,
        data_type: column.DATA_TYPE,
      }));
    } catch (e) {
      return [];
    }
  };

  findData = async (
    table: string,
    column: string,
    measureColumn: string,
    operation: string,
    filters: any,
    columnFormat?: string,
    orderByStr?: string,
    groupColumn?: string
  ) => {
    const secondaryCol = measureColumn ? measureColumn : column,
      col = columnFormat
        ? `TO_CHAR(t.${column}, '${columnFormat}')`
        : `t.${column}`,
      joinWith = " AND ",
      params = {},
      whereClauses = filters
        .map((filter: any, index: number) => {
          params[`val${index}`] = filter.value;
          return `t.${filter.column} ${filter.operation} :val${index}`;
        })
        .join(joinWith),
      [orderBy, orderByDir] = orderByStr.split(" "),
      groupBy = groupColumn ? `${groupColumn}, ${col}` : `${col}`,
      groupstr = groupColumn ? `, ${groupColumn} AS grouped` : "",
      orderByCol =
        Boolean(orderBy) && orderBy === column
          ? `${col} ${orderByDir}, val ${orderByDir}`
          : `val ${orderByDir}, ${col} ${orderByDir}`,
      sql = `SELECT ${col} AS Name, ${operation}(t.${secondaryCol}) AS val ${groupstr}
      FROM ${table} t
      ${whereClauses ? `WHERE ${whereClauses}` : ""}
      GROUP BY ${groupBy}
      ORDER BY ${orderByCol}`;

    try {
      const [q, p] = this.connection.driver.escapeQueryWithParameters(
          sql,
          params,
          {}
        ),
        results = await this.connection.manager.query(q, p);

      if (groupColumn) {
        return results;
      }
      return results.map((r: any) => ({
        name: r.NAME,
        value: r.VAL,
      }));
    } catch (e) {
      return [];
    }
  };
}
