import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EquiposModule } from './equipos/equipos.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { OrdenesTrabajoModule } from './ordenes-trabajo/ordenes-trabajo.module';
import { ActividadesModule } from './actividades/actividades.module';
import { PlanMantenimientoModule } from './plan-mantenimiento/plan-mantenimiento.module';
import { ImagenesEquipoModule } from './imagenes-equipo/imagenes-equipo.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ValidationPipe } from './common/validation.pipe';
import { CategoriasController } from './categoria/categoria.controller';
import { CategoriasModule } from './categoria/categoria.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ContratistasModule } from './contratistas/contratistas.module';
import { SharePointModule } from './sharepoint/sharepoint.module';



@Module({
  imports: [
    EquiposModule,
    DepartamentosModule,
    SolicitudesModule,
    OrdenesTrabajoModule,
    ActividadesModule,
    PlanMantenimientoModule,
    ImagenesEquipoModule,
    UsuariosModule,
    CategoriasModule,
    UbicacionesModule,
    ProveedoresModule,
    ContratistasModule,
    SharePointModule
    ,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
