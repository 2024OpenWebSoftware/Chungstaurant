// 도로명 주소 -> 위도 경도 
export const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      const waitForKakao = () => {
        if (
          typeof window.kakao !== 'undefined' &&
          typeof window.kakao.maps !== 'undefined' &&
          typeof window.kakao.maps.services !== 'undefined'
        ) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const { x, y } = result[0];
              resolve({ lat: parseFloat(y), lng: parseFloat(x) });
            } else {
              reject(new Error('Failed to convert address to coordinates'));
            }
          });
        } else {
          setTimeout(waitForKakao, 100); // Retry after 100ms
        }
      };
  
      waitForKakao();
    });
  };
  