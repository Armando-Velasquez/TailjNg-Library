import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConverterService } from './converter.service';
import { ApiResponse } from './interface/api-response';
import { API_URL } from './api-url';
import { JHttpParamsService } from './http-rest.service';

// Tipado para los parámetros de consulta
export interface QueryParams {
    page?: number;
    limit?: number;

    sort?: { column?: string | null; direction?: string };

    filters?: any;
    defaultFilters?: { [key: string]: any };

    searchQuery?: string;
    columns?: string[]
}

@Injectable({
    providedIn: 'root'
})
export class JGenericService {

    constructor(
        @Inject(API_URL) private readonly baseUrl: string,
        private readonly http: HttpClient,
        private readonly HttpParamsService: JHttpParamsService,
        private readonly converterService: ConverterService,
        // private readonly socket: SocketShared,
    ) { }

    /**
     * Método genérico para obtener todos los registros desde un endpoint.
     * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
     * @param params Parámetros de la petición.
     * @returns Observable con la respuesta de la API.
     */
    getAll<T>(endpoint: string, params?: Params): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;

        // Construir HttpParams
        let httpParams;
        if (params) httpParams = this.HttpParamsService.resParams(params);

        // Hacer la petición GET con los HttpParams formateados
        return this.http.get<ApiResponse<T>>(url, { params: httpParams });
    }


    /**
     * Método genérico para obtener un registro desde un endpoint.
     * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
     * @param id Identificador del registro.
     * @returns Observable con la respuesta de la API.
     */
    getId<T>(endpoint: string, id: number): Observable<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.get<ApiResponse<{ [key: string]: T }>>(`${url}/${id}`).pipe(
            map(response => response.data[endpoint])
        );
    }


    /**
     * Método genérico para agregar un registro a un endpoint.
     * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
     * @param data Datos del registro a agregar.
     * @returns Observable con la respuesta de la API.
     */
    create<T>(endpoint: string, data: T): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.post<ApiResponse<T>>(url, data);
    }


    /**
     * Método genérico para actualizar un registro en un endpoint.
     * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
     * @param id Identificador del registro.
     * @param data Datos del registro a actualizar.
     * @returns Observable con la respuesta de la API.
     */
    update<T>(endpoint: string, id: number, data: T): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.put<ApiResponse<T>>(`${url}/${id}`, data);
    }


    /**
     * Método genérico para eliminar un registro de un endpoint.
     * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
     * @param id Identificador del registro.
     * @returns Observable con la respuesta de la API.
     */
    delete<T>(endpoint: string, id: number): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.delete<ApiResponse<T>>(`${url}/${id}`);
    }


    /**
    * Método genérico para actualizar estados de un registro en un endpoint.
    * @param endpoint Distintivo del endpoint ('role', 'status', etc.)
    * @param id Identificador del registro.
    * @param data Datos de un registro booleano a actualizar.
    * @returns Observable con la respuesta de la API.
    */
    enable<T>(endpoint: string, id: number, data: T): Observable<ApiResponse<T>> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.put<ApiResponse<T>>(`${url}/enable/${id}`, data);
    }


    /**
    * Método genérico para obtener los parámetros de consulta para una tabla.
    * @param page Número de página actual.
    * @param limit Número de registros por página.
    * @param sort Objeto que contiene la columna y la dirección de ordenamiento.
    * @param filters Filtros aplicados a la consulta.
    * @param defaultFilters Filtros predeterminados aplicados a la consulta.
    * @param searchQuery Cadena de búsqueda.
    * @param columns Columnas a buscar.
    * @returns 
    */
    params({page, limit, sort, filters, defaultFilters, searchQuery, columns}: QueryParams): Params {
        
        const params: Params = {}

        if (page) params['page'] = page.toString();
        if (limit) params['limit'] = limit.toString();

        // Aplicar los filtros predeterminados enviados desde el padre
        Object.keys(defaultFilters ?? {}).forEach((key) => {
            if (!filters.hasOwnProperty(key)) {
                params[`filter[${key}]`] = defaultFilters![key];
            }
        });

        // Aplicar el ordenamiento si se ha proporcionado
        if (sort?.column && sort?.direction !== 'none') {
            const sortKey = this.converterService.getSortKey(sort?.column);
            params['sortBy'] = sortKey;
            params['sortOrder'] = sort?.direction?.toUpperCase();
        }

        // Aplicar la búsqueda si se ha proporcionado
        if (searchQuery && searchQuery.trim() !== '') {
            params['search'] = searchQuery;
            params['searchFields'] = columns?.map(col => col) ;
        }

        // Aplicar los filtros si se han proporcionado
        if (Object.keys(filters).length > 0) {
            params['filter'] = filters;
        }

        return params;
    }

    // // =====================
    // // WebSocket Genéricos
    // // =====================

    // /**
    //  * Escuchar evento de creación
    //  * @param entity nombre de la entidad (ej: 'period', 'user')
    //  */
    // onCreated<T = any>(entity: string): Observable<T> {
    //     return this.socket.listenTo<T>(`${entity}:created`);
    // }
    
    // /**
    //  * Escuchar evento de actualización
    //  */
    // onUpdated<T = any>(entity: string): Observable<T> {
    //     return this.socket.listenTo<T>(`${entity}:updated`);
    // }
    
    // /**
    //  * Escuchar evento de eliminación
    //  */
    // onDeleted<T = any>(entity: string): Observable<T> {
    //     return this.socket.listenTo<T>(`${entity}:deleted`);
    // }
    
    // /**
    //  * Escuchar evento de activación/habilitación
    //  */
    // onEnabled<T = any>(entity: string): Observable<T> {
    //     return this.socket.listenTo<T>(`${entity}:enabled`);
    // }

    // /**
    //  * Escuchar múltiples eventos de una entidad
    //  * @param entity nombre de la entidad (ej: 'period')
    //  * @param actions lista de eventos a escuchar (ej: ['created', 'updated'])
    //  * @param persistent true si quieres que se mantenga el listener al salir del componente
    //  */
    // listenToMany<T = any>(
    //     entity: string,
    //     actions: Array<'created' | 'updated' | 'deleted' | 'enabled' | string>,
    //     persistent: boolean = false
    // ): Observable<{ event: string, data: T }> {
    //     return this.socket.listenToMany<T>(entity, actions, persistent);
    // }
    
}
