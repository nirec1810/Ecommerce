FROM eclipse-temurin:17-jdk-focal
EXPOSE 8083
# Crear grupo y usuario para seguridad
RUN groupadd -r ecommerce && useradd -r -g ecommerce admin
VOLUME /tmp
# Copiar el jar
COPY target/*.jar app.jar
# Dar permisos al usuario sobre el archivo
RUN chown admin:ecommerce /app.jar
# Cambiar al usuario no-root
USER admin:ecommerce
ENTRYPOINT ["java","-jar","/app.jar"]