
function toHex(dec)
{
    var hx = dec.toString(16);

    if (hx.length == 1) { return '0' + hx; }

    return hx;
}

function toHexString(bytes)
{
    var output = '';

    for (var i = 0; i < bytes.length; i++) 
    {
        output += toHex(bytes[i]);
    }

    return output;
}

function parseHexString(str)
{
    var temp = str.match(/.{1,2}/g);
    var output_bytes = [];

    for (var i = 0; i < temp.length; i++) 
    {
        output_bytes.push(parseInt(temp[i], 16));
    }

    return output_bytes;
}

function shrubEncrypt(text, given_key, isHexKey)
{
    var text_bytes = []
    var key_bytes = []
    var output_bytes = []
    var output = '';

    var key = ""

    // Resize key if key is too small
    while (key.length < text.length)
    {
        key += given_key;
    }

    // Convert to ASCII Characters
    for (var i = 0; i < text.length; i++)
    {
        text_bytes.push(text.charCodeAt(i));
        //key_bytes.push(key.charCodeAt(i));
    }

    // Parse Key
    if (isHexKey)
    {
        key_bytes = parseHexString(key);
    }
    else
    {
        for (var i = 0; i < text.length; i++) 
        {
            key_bytes.push(key.charCodeAt(i));
        }
    }

    // Apply XOR
    for (var i = 0; i < text_bytes.length; i++)
    {
        output_bytes.push(text_bytes[i] ^ key_bytes[i]);
    }

    return toHexString(output_bytes);
}

function shrubDecrypt(text, given_key, isHexKey, hexDecrypt)
{
    var text_bytes = parseHexString(text);
    var key_bytes = []
    var output_bytes = [];
    
    var output = '';
    var key = '';

    // Resize key if key is too small
    while (key.length < Math.ceil(text.length / 2))
    {
        key += given_key;
    }

    // Parse key
    if (isHexKey)
    {
        key_bytes = parseHexString(key);
    }
    else
    {
        for (var i = 0; i < key.length; i++) 
        {
            key_bytes.push(key.charCodeAt(i));
        }
    }

    // Apply XOR
    for (var i = 0; i < text_bytes.length; i++) 
    {
        output_bytes.push(text_bytes[i] ^ key_bytes[i]);
    }

    if (hexDecrypt)
    {
        return toHexString(output_bytes);
    }

    // Convert to ASCII
    for (var i = 0; i < output_bytes.length; i++)
    {
        output += String.fromCharCode(output_bytes[i]);
    }

    return output;

}