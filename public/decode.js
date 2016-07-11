/**
 * Created by saurabhbansal on 7/10/16.
 */
    $("#tabstrip").ejTab();
    var txtSrcEditor = ace.edit("text");
    txtSrcEditor.session.setUseWrapMode(true);
    txtSrcEditor.getSession().setTabSize(0);
    txtSrcEditor.setOptions({
        minLines:10,
        maxLines: Infinity
    });
    txtSrcEditor.setValue('')
    $("#primaryTextButton").click( function()
        {
            $.post( "/decode",{data:txtSrcEditor.getValue()}, function( data ) {
                txtSrcEditor.setValue(data)
            });
        }
    );

