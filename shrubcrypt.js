
function toHex(dec)
{
    var hx = dec.toString(16);

    if (hx.length == 1) { return '0' + hx; }

    return hx;
}

function shrubEncrypt(text, given_key)
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
        key_bytes.push(key.charCodeAt(i));
    }

    // Apply XOR
    for (var i = 0; i < text_bytes.length; i++)
    {
        output_bytes.push(text_bytes[i] ^ key_bytes[i]);
    }

    // Translate from ASCII to Hex
    for (var i = 0; i < output_bytes.length; i++)
    {
        output += toHex(output_bytes[i]);
    }

    return output;
}

function shrubDecrypt(text, given_key)
{
    var text_bytes = [];
    var key_bytes = []
    var output_bytes = [];
    
    var temp = text.match(/.{1,2}/g);
    var output = '';
    var key = '';

    // Resize key if key is too small
    while (key.length < Math.ceil(text.length / 2))
    {
        key += given_key;
    }

    // Parse hexadecimal bytes
    for (var i = 0; i < temp.length; i++)
    {
        text_bytes.push(parseInt(temp[i], 16));
    }

    // Parse key bytes
    for (var i = 0; i < key.length; i++)
    {
        key_bytes.push(key.charCodeAt(i));
    }

    // Apply XOR
    for (var i = 0; i < text_bytes.length; i++) 
    {
        output_bytes.push(text_bytes[i] ^ key_bytes[i]);
    }

    // Convert to ASCII
    for (var i = 0; i < output_bytes.length; i++)
    {
        output += String.fromCharCode(output_bytes[i]);
    }

    return output;

}