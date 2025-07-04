import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
    iconUrl: '/Group 48424.png',
    iconSize: [120, 120],
    iconAnchor: [50, 100],
    popupAnchor: [0, -100],
    className: 'custom-marker object-contain',
});

const MapWithLogo = () => {
    const position = [41.306471, 69.236541];
    const googleMapsLink = `https://maps.google.com/?q=${position[0]},${position[1]}`;

    return (
        <div className="w-full h-[600px] mx-auto mt-10 rounded-[30px]  overflow-hidden">
            <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={true}
                style={{ height: '600px', width: '100%' }}>

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} icon={customIcon} eventHandlers={{
                    click: () => window.open(googleMapsLink, '_blank'),
                }}>
                    <Popup>My School</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapWithLogo;
