const createAvatarMarker = (imageUrl) => {
  return L.divIcon({
    className: "custom-avatar-icon",
    html: `
      <div class="avatar-marker">
        <img src="${imageUrl}" alt="User" />
        <div class="arrow-down"></div>
      </div>
    `,
    iconSize: [50, 60],
    iconAnchor: [25, 60], // Align arrow tip with location
    popupAnchor: [0, -60],
  });
};

export default createAvatarMarker;
