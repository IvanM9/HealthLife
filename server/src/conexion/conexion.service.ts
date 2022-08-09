/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Cruddata } from './cruddata';
import * as url from 'url';
require('dotenv').config();
@Injectable()
export class ConexionService {
    private readonly database;
    private config:any;
    constructor() {
        if (process.env.DATABASE_URL) {
            const params = url.parse(process.env.DATABASE_URL);
            const auth = params.auth.split(':');
    
            this.config = {
                user: auth[0],
                password: auth[1],
                host: params.hostname,
                port: params.port,
                database: params.pathname.split('/')[1],
                ssl: {
                    rejectUnauthorized: false
                }
            };
        }
        else {
            this.config = {
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: '5432'
            }
        }
        this.database = new Pool(this.config);
        // if(this.database.connect())
        //     console.log('Conexion exitosa');
        // else
        //     console.log('Conexion fallida');
    }

    private async queryWithValues(query: string, params: any[]): Promise<any> {
        return this.database.query(query, params);
    }

    private async query(query: string) {
        return this.database.query(query);
    }

    private retorno: any;
    async executeProcedure(name: string, params: any[] | null): Promise<any> {
        try {
            if (params == null || params.length == 0)
                this.retorno = (await this.query(`select ${name} ()`)).rows;
            else {
                const element: string[] = [];
                for (let index = 1; index <= params.length; index++) {
                    element.push('$' + index);
                }
                this.retorno = (await this.queryWithValues(`select ${name} (${element.join(', ')})`, params)).rows;
            }
 
            if (this.retorno.length > 1) {
                const aux = [];
                this.retorno.forEach(elemento => {
                    aux.push(elemento[name]);
                });
                return aux;
            } else if (this.retorno.length == 1)
                return this.retorno[0][name];
            return this.retorno
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    private async insert(datos: Cruddata): Promise<any> {
        return this.database.query(`INSERT INTO ${datos.tabla} (${datos.campos.join(',')}) VALUES (${datos.valores.join(',')})`);
    }

    private async update(datos: Cruddata) {
        return this.database.query(`UPDATE ${datos.tabla} SET ${datos.campos.join('=?, ')}=? WHERE ${datos.campos[0]}=?`, [...datos.valores, datos.valores[0]]);
    }

    private async delete(datos: Cruddata) {
        return this.database.query(`DELETE FROM ${datos.tabla} WHERE ${datos.campos[0]}=?`, [datos.valores[0]]);

    }

    private async select(tabla: string) {
        return this.database.query('SELECT * FROM ' + tabla);
    }
}
