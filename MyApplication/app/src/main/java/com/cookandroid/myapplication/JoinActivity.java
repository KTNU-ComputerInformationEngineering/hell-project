package com.cookandroid.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class JoinActivity extends Activity {
    private EditText edtEmail;
    private EditText edtName;
    private EditText edtDate;
    private EditText edtPassword;
    private EditText edtPasswordConfirm;
    private Button btnDone;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.join);

        edtEmail = (EditText) findViewById(R.id.edtEmail);
        edtName = (EditText) findViewById(R.id.edtName);
        edtDate = (EditText) findViewById(R.id.edtDate);
        edtPassword = (EditText) findViewById(R.id.edtPassword);
        edtPasswordConfirm = (EditText) findViewById(R.id.edtPasswordConfirm);
        btnDone = (Button) findViewById(R.id.btnDone);
        Button btn3 = (Button) findViewById(R.id.btn3);

        edtPasswordConfirm.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                String password = edtPassword.getText().toString();
                String confirm = edtPasswordConfirm.getText().toString();

                if (password.equals(confirm)) {
                    edtPassword.setBackgroundColor(Color.GREEN);
                    edtPasswordConfirm.setBackgroundColor(Color.GREEN);
                } else {
                    edtPassword.setBackgroundColor(Color.RED);
                    edtPasswordConfirm.setBackgroundColor(Color.RED);
                }
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });

        btnDone.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // 이메일 입력 확인
                if (edtEmail.getText().toString().length() == 0) {
                    Toast.makeText(JoinActivity.this, "이메일을 입력하세요.", Toast.LENGTH_SHORT).show();
                    edtEmail.requestFocus();
                    return;
                }

                // 비밀번호 입력 확인
                if (edtPassword.getText().toString().length() == 0) {
                    Toast.makeText(JoinActivity.this, "비밀번호를 입력하세요.", Toast.LENGTH_SHORT).show();
                    edtPassword.requestFocus();
                    return;
                }

                // 비밀번호 확인 입력 확인
                if (edtPasswordConfirm.getText().toString().length() == 0) {
                    Toast.makeText(JoinActivity.this, "비밀번호 확인을 입력하세요.", Toast.LENGTH_SHORT).show();
                    edtPasswordConfirm.requestFocus();
                    return;
                }

                // 비밀번호 일치 확인
                if (!edtPassword.getText().toString().equals(edtPasswordConfirm.getText().toString())) {
                    Toast.makeText(JoinActivity.this, "비밀번호가 일치하지 않습니다.", Toast.LENGTH_SHORT).show();
                    edtPassword.setText("");
                    edtPasswordConfirm.setText("");
                    edtPassword.requestFocus();
                    return;
                }

                Intent result = new Intent();
                result.putExtra("email", edtEmail.getText().toString());

                //자신을 호출한 액티비티로 데이터를 보냄
                setResult(RESULT_OK, result);
                finish();
            }
        });

        btn3.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                finish();
            }
        });
    }


    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        Log.d("RESULT", requestCode + "");
        Log.d("RESULT", resultCode + "");
        Log.d("RESULT", data + "");

        if (requestCode == 1000 && resultCode == RESULT_OK) {
            Toast.makeText(JoinActivity.this, "회원가입을 완료했습니다.", Toast.LENGTH_SHORT).show();
            edtEmail.setText(data.getStringExtra("email"));
        }
    }
}

