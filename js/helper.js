export class Helper {

    static random(min, max) {
        return min + Math.random() * (max-min);
	}

	static randomTrunc(min, max) {
        return Math.trunc(min + Math.random() * (max-min));
	}
	
    static clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
	}
	
    static strToRgb(str) {
		let r = 0, g = 0, b = 0;
		if (str.charAt(0) === "#") {
			str = str.substring(1, str.length);
			if (str.length === 3) {
				r = parseInt(str.charAt(0),16)*17;
				g = parseInt(str.charAt(1),16)*17;
				b = parseInt(str.charAt(2),16)*17;
			} else if (str.length === 6) {
				r = parseInt(str.substring(0,2),16);
				g = parseInt(str.substring(2,4),16);
				b = parseInt(str.substring(4,6),16);
			}
		} else if (str.indexOf('rgb(') === 0 ) {
			str = str.substring(4, str.length - 1);
			let arr = str.split(',');
			if (arr.length === 3) {
				r = parseInt(arr[0],10);
				g = parseInt(arr[1],10);
				b = parseInt(arr[2],10);
			}
		}
		return [r, g, b];
	}
	
    static rgbToStr(r, g, b) {
        let str = '#';
        str += r.toString(16).length === 1 ? '0' + r.toString(16): r.toString(16);
        str += g.toString(16).length === 1 ? '0' + g.toString(16): g.toString(16);
        str += b.toString(16).length === 1 ? '0' + b.toString(16): b.toString(16);
        return str;
	}
	
	static rgbToHsl(r, g, b) {
		r /= 255;
		g /= 255;
		b /= 255;
		let max = Math.max(r, g, b);
		let min = Math.min(r, g, b);
		let h, s, l = (max + min) / 2;
		if (max === min) {
			h = s = 0; // achromatic
		} else {
			let d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch (max){
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return [Math.trunc(360*h), Math.trunc(s*100), Math.trunc(l*100)];
	}

	static strToHsl(str) {
		return Helper.rgbToHsl(...Helper.strToRgb(str));
	}

    static hslToRgb(h, s, l) {
		let r, g, b;
		if (s == 0){
			r = g = b = l; // achromatic
		} else {
			let hue2rgb = function hue2rgb(p, q, t) {
				if(t < 0) t += 1;
				if(t > 1) t -= 1;
				if(t < 1/6) return p + (q - p) * 6 * t;
				if(t < 1/2) return q;
				if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			};
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
};
