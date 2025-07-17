"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QRCodeCanvas } from "qrcode.react";

// Define a type for a person
interface Person {
  id: number;
  name: string;
  lastName: string;
  age: number;
  address: string;
  phone: string;
  dni: string;
  position: { lat: number; lng: number };
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { theme } = useTheme();

  // Only people in Lima
  const people: Person[] = [
    {
      id: 1,
      name: "Juan",
      lastName: "Perez",
      age: 68,
      address: "Av. Arequipa 1234, Lima",
      phone: "+51 987654321",
      dni: "12345678",
      position: { lat: -12.0464, lng: -77.0428 }, // Lima
    },
    {
      id: 2,
      name: "Maria",
      lastName: "Lopez",
      age: 64,
      address: "Jr. Lampa 567, Lima",
      phone: "+51 912345678",
      dni: "87654321",
      position: { lat: -12.05, lng: -77.033 }, // Lima
    },
    {
      id: 3,
      name: "Carlos",
      lastName: "Sanchez",
      age: 81,
      address: "Calle Piura 890, Lima",
      phone: "+51 923456789",
      dni: "23456789",
      position: { lat: -12.0432, lng: -77.0282 }, // Lima
    },
    {
      id: 4,
      name: "Ana",
      lastName: "Ramirez",
      age: 85,
      address: "Av. Grau 321, Lima",
      phone: "+51 934567890",
      dni: "34567890",
      position: { lat: -12.055, lng: -77.045 }, // Lima
    },
    {
      id: 5,
      name: "Luis",
      lastName: "Torres",
      age: 60,
      address: "Jr. Loreto 456, Lima",
      phone: "+51 945678901",
      dni: "45678901",
      position: { lat: -12.048, lng: -77.03 }, // Lima
    },
    {
      id: 6,
      name: "Sofia",
      lastName: "Vargas",
      age: 92,
      address: "Av. Bolognesi 789, Lima",
      phone: "+51 956789012",
      dni: "56789012",
      position: { lat: -12.04, lng: -77.02 }, // Lima
    },
  ];

  // State for which marker's modal is open
  const [selected, setSelected] = useState<Person | null>(null);
  const [section, setSection] = useState<
    "home" | "information" | "settings" | "user"
  >("home");

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  // Center in Lima
  const center = { lat: -12.0464, lng: -77.0428 };

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-border h-24">
        <img
          src="logo.png"
          alt="Logo"
          className="w-48 h-auto hidden md:block"
        />
        <img src="logoMovil.png" alt="Logo" className="w-16 h-auto md:hidden" />
        <div>
          <ModeToggle />
        </div>
      </div>

      <div className="h-[calc(100vh-160px)]">
        {section === "home" && (
          <div className="h-full">
            <LoadScript googleMapsApiKey={apiKey || ""}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
              >
                {people.map((person) => (
                  <Marker
                    key={person.id}
                    position={person.position}
                    onClick={() => setSelected(person)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>

            <Dialog
              open={!!selected}
              onOpenChange={(open) => !open && setSelected(null)}
            >
              <DialogContent>
                {selected && (
                  <>
                    <DialogHeader>
                      <DialogTitle>Detalles de la persona</DialogTitle>
                      <DialogDescription>
                        <div className="flex flex-col items-center">
                          <QRCodeCanvas
                            value={JSON.stringify({
                              nombre: selected.name,
                              apellido: selected.lastName,
                              edad: selected.age,
                              direccion: selected.address,
                              telefono: selected.phone,
                              dni: selected.dni,
                            })}
                            size={180}
                            level="H"
                            includeMargin={true}
                          />
                          {/* Optionally, show the data below the QR */}
                          {/* <div className="mt-4 text-center">
                            <strong>
                              {selected.name} {selected.lastName}
                            </strong>
                            <br />
                            Edad: {selected.age}
                            <br />
                            Dirección: {selected.address}
                            <br />
                            Teléfono: {selected.phone}
                            <br />
                            DNI: {selected.dni}
                          </div> */}
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
        {section === "information" && (
          <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Información</h2>
            <p>
              Bienvenido a <strong>Nostos</strong>, una aplicación diseñada para
              ayudar a localizar y asistir a personas mayores en Lima.
            </p>
            <ul className="list-disc pl-6">
              <li>
                Visualiza en el mapa la ubicación de personas registradas.
              </li>
              <li>
                Haz clic en un marcador para ver detalles y datos de contacto.
              </li>
              <li>
                La información es confidencial y solo accesible para usuarios
                autorizados.
              </li>
            </ul>
            <p>
              Si tienes dudas o necesitas soporte, contacta a nuestro equipo a
              través de la sección de usuario.
            </p>
          </div>
        )}
        {section === "settings" && (
          <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Configuración</h2>
            <div>
              <label className="block font-semibold mb-2">Tema</label>
              <ModeToggle />
            </div>
            <div>
              <label className="block font-semibold mb-2">Notificaciones</label>
              <input type="checkbox" id="notifications" className="mr-2" />
              <label htmlFor="notifications">Activar notificaciones</label>
            </div>
            <div>
              <label className="block font-semibold mb-2">Idioma</label>
              <select className="border rounded px-2 py-1">
                <option>Español</option>
                <option>English</option>
              </select>
            </div>
          </div>
        )}
        {section === "user" && (
          <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">Nombre: Juan Pérez</div>
                <div className="text-sm text-muted-foreground">
                  Correo: juan.perez@email.com
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline">Editar perfil</Button>
              <Button variant="destructive" className="ml-4">
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <nav className="flex gap-6 p-4 border-t border-border justify-around h-16 bg-background">
        <Button
          onClick={() => setSection("home")}
          className={section === "home" ? "font-bold" : ""}
          variant={theme === "dark" && section === "home" ? "default" : "ghost"}
        >
          <img src="home.png" alt="Home" className="w-4 h-4" />
          Home
        </Button>
        <Button
          onClick={() => setSection("user")}
          className={section === "user" ? "font-bold" : ""}
          variant={theme === "dark" && section === "home" ? "default" : "ghost"}
        >
          <img src="user.png" alt="User" className="w-4 h-4" />
          Usuario
        </Button>
        <Button
          onClick={() => setSection("information")}
          className={section === "information" ? "font-bold" : ""}
          variant={theme === "dark" && section === "home" ? "default" : "ghost"}
        >
          <img src="info.png" alt="Info" className="w-4 h-4" />
          Información
        </Button>
        <Button
          onClick={() => setSection("settings")}
          className={section === "settings" ? "font-bold" : ""}
          variant={theme === "dark" && section === "home" ? "default" : "ghost"}
        >
          <img src="settings.png" alt="Settings" className="w-4 h-4" />
          Configuración
        </Button>
      </nav>
    </div>
  );
}
