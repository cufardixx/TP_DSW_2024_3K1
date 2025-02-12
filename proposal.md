# Propuesta TP DSW

## Grupo
### Integrantes
* 48072 - Picia Facundo
* 48083 - Tomas Yasparra

### Repositorios
* [frontend app](https://github.com/cufardixx/TP_DSW_2024_3K1/tree/main/Backend)
* [backend app](https://github.com/cufardixx/TP_DSW_2024_3K1/tree/main/Frontend)


## Tema

La aplicación web ofrece un sistema de compra de entradas para eventos. Los usuarios ingresarán a la aplicación y deberán registrarse ingresando sus datos personales. En el caso de que ya estén registrados, iniciarán sesión con su correo electrónico y su contraseña. Una vez registrados, podrán elegir entre crear un evento o adquirir entradas para asistir a uno.

Para la búsqueda, contarán con distintos filtros para visualizar por categoría y con una barra de búsqueda. Cada evento contará con diferentes categorías (cumpleaños, festival, bar nocturno, etc.). Una vez que el usuario realice la selección y finalice la compra de la entrada, recibirá en su casilla de correo un mensaje de confirmación, el cual será utilizado como entrada. Además, cada usuario contará con un apartado dentro de la aplicación para ver todas las entradas que ha adquirido junto con sus códigos QR.

En el caso de la carga de eventos, deberán llenar un formulario con la información del evento. Una vez ingresado, el evento podrá ser accedido por otros usuarios. Los usuarios, además, contarán con un apartado para ver todos los eventos que hayan creado, donde podrán editarlos o eliminarlos. El apartado contará con botones para ordenar los eventos por fecha o por nombre.


### Modelo
![BD-model](https://github.com/user-attachments/assets/f004f1a1-9bca-4ce0-ae3e-5f1665298992)



### Reglas de negocio

## Alcance Funcional 

Registro y Autenticación:
-Permitir a los usuarios registrarse y autenticarse de manera segura.
-Permitir a los usuarios elegir una categoria para un evento.

Gestión de Perfiles de Usuario:
-Los usuarios pueden ver y editar su perfil.

Selección de eventos:
-Mostrar a los usuarios los eventos disponibles.
-Permitir a los usuarios comprar una entrada para un evento.

Visualización de eventos disponibles:
-Presentar una variedad de eventos.
-Proporcionar detalles claros sobre la fecha y lugar.

### Alcance Mínimo
Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD usuario<br>2. CRUD evento<br>3. CRUD categoria|
|CRUD dependiente|1. CRUD categoria {depende de} CRUD evento<br>2. CRUD entrada {depende de} CRUD usuario|
|Listado<br>+<br>detalle| 1. Listado de eventos filtrados por categoria => detalle CRUD Evento|
|CUU/Epic|1. Comprar una entrada para un evento|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD usuario<br>2. CRUD evento<br>3. CRUD entrada<br>4. CRUD categoria|
|CUU/Epic|1. Comprar una entrada para un evento<br>2. Realizar la carga de un evento|

